import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { Jwt } from "jsonwebtoken";
import { apiLogin, apiRefreshToken } from "@utils/api/external";
import {
  apiLoginRequestSchema,
  apiLoginResponseSchema,
  apiRefreshTokenResponseSchema,
} from "@libs/validate/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET ?? "terces-htua-u4nnif",
  pages: {
    signIn: "/auth/login",
  },
  session: {
    maxAge: 4 * 60 * 1000,
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = apiLoginRequestSchema.parse(credentials);
          const response = await apiLogin({ email: email, password: password });

          const { data } = apiLoginResponseSchema.parse(response.data);
          const accessToken = data.access_token;
          const refreshToken = data.refresh_token;

          return {
            accessToken,
            refreshToken,
            role: "user",
            name: email.split("@").shift(),
            email: email,
          };
        } catch (error) {
          console.error(`error api login - ${JSON.stringify(error)}`);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (token?.accessToken) {
        const decodeToken = jwtDecode(token.accessToken as string);
        token.accessTokenExpires = (decodeToken?.exp as number) * 1000;
      }

      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user,
        };
      }

      if (token?.accessTokenExpires) {
        const accessTokenExpire = token.accessTokenExpires as number;
        console.log(
          `****** Token - have token ${Date.now()},${accessTokenExpire} *******`
        );

        if (Date.now() < accessTokenExpire) {
          console.log(
            `***** returning previous token ${new Date(
              Date.now()
            )} ->>>> ${new Date(accessTokenExpire)} *****`
          );
          return token;
        }
      }
      console.log("**** Refresh-Token now ****");
      return refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      console.log(`**** callback session - ${JSON.stringify(token)}`);
      if (token) {
        return {
          ...session,
          user: token.user as User,
        };
      }

      return session;
    },
  },
});

async function refreshAccessToken(token: Jwt | any) {
  try {
    const response = await apiRefreshToken({
      refresh_token: token.refreshToken,
    });
    const { data } = apiRefreshTokenResponseSchema.parse(response.data);
    if (!data) {
      return null;
    }
    return {
      ...token,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(`RefresAccessTokenError - ${error.message}`);
    }
    return null;
  }
}
