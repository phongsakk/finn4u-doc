import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { Jwt } from "jsonwebtoken";
import { log, logError } from "@components/helpers";
import dayjs from "dayjs";
import { api } from "@utils/api/index";

declare module "next-auth" {
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      id: "credentialsRegister",
      name: "credentialsRegister",
      credentials: {
        email: { label: "Email", type: "email" },
        accessToken: { label: "accessToken", type: "text" },
        refreshToken: { label: "refreshToken", type: "text" },
        userType: { label: "userType", type: "text" },
      },
      authorize: async ({ email, accessToken, refreshToken, userType }) => {
        if (!email && !accessToken && !refreshToken) {
          return null;
        }
        try {
          return {
            accessToken: accessToken as string,
            refreshToken: refreshToken as string,
            role: userType || "general",
            name: email as string,
            email: email as string,
          };
        } catch (error) {
          logError("bypass login error: ", error);
          return null;
        }
      },
    }),
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        userType: { label: "User type", type: "text" },
      },
      authorize: async ({ email, password, userType }) => {
        if (email === null && password === null) {
          return null;
        }

        try {
          let api_path = "";
          switch (userType) {
            case "general":
              api_path = "/v1/general/auth/login";
              break;
            case "consignor":
              api_path = "/v1/auth/signin";
              break;
            case "invester":
              api_path = "/v1/auth/signin";
              break;
            default:
              api_path = "/v1/general/auth/login";
              break;
          }
          // logError(userType)
          const response = await axios.post(api.external(api_path), {
            email,
            password,
          });

          const res = await response.data;

          if (!res) {
            return null;
          }
          const accessToken = res.data.access_token;
          const refreshToken = res.data.refresh_token;

          return {
            accessToken,
            refreshToken,
            role: userType || "general",
            name: email as string,
            email: email as string,
          };
        } catch (error) {
          if (error instanceof AxiosError) {
            logError(`Error api login: `, error.message);
          }
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
        log(
          `Access Token: DateNow("${dayjs(Date.now()).format(
            "DD-MM-YYYY HH:mm:ss"
          )}") - ExpireDate("${dayjs(accessTokenExpire).format(
            "DD-MM-YYYY HH:mm:ss"
          )}")`
        );

        if (Date.now() < accessTokenExpire) {
          log(
            `Returning previous token "${dayjs(Date.now()).format(
              "DD-MM-YYYY HH:mm:ss"
            )}" < "${dayjs(accessTokenExpire).format("DD-MM-YYYY HH:mm:ss")}"`
          );
          return token;
        }
      }
      log("Refresh-Token now.");
      return refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      log(`Callback session: User "${token.name}"`);
      if (token) {
        return {
          ...session,
          user: token.user as User,
        };
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url);
      const domain = parsedUrl.hostname;
      log(`Redirecting to: ${url} (domain: ${domain}, base: ${baseUrl})`);
      return url;
    },
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET ?? "terces-htua-u4nnif",
});

async function refreshAccessToken(token: Jwt | any) {
  try {
    const response = await axios.post(api.external("/v1/auth/refresh-token"), {
      refresh_token: `${process.env.NEXT_PUBLIC_AUTH_SECRET} ${token.refreshToken}`,
    });
    const new_token = await response.data;
    if (!new_token) {
      return null;
    }
    return {
      ...token,
      accessToken: new_token.data.access_token,
      refreshToken: new_token.data.refresh_token,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      logError("RefresAccessTokenError: ", error.message);
    }
    return null;
  }
}
