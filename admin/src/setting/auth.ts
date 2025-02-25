import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
import { api, apiLogin } from "@utils/api";
import {
  apiLoginRequestSchema,
  apiLoginResponseSchema,
} from "@libs/validate/auth";
import { ZodError } from "zod";
import dayjs from "dayjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET ?? "terces-htua-u4nnif",
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpiredAt = user.accessTokenExpiredAt.toISOString();
        token.refreshTokenExpiredAt = user.refreshTokenExpiredAt.toISOString();
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;
      session.user.accessTokenExpiredAt = token.accessTokenExpiredAt;
      session.user.refreshTokenExpiredAt = token.refreshTokenExpiredAt;
      return session;
    },
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password" },
      },
      authorize: async (credentials) => {
        try {
          const payload = await apiLoginRequestSchema.parseAsync(credentials);
          const response = await apiLogin(payload);

          const session = await apiLoginResponseSchema.parseAsync(
            response.data
          );

          const user: User = {
            id: session.data.refresh_token,
            email: payload.email,
            name: payload.email.split("@")[0],
            image: session.data.refresh_token,
            accessToken: session.data.access_token,
            refreshToken: session.data.refresh_token,
            accessTokenExpiredAt: dayjs(session.data.access_expires_in),
            refreshTokenExpiredAt: dayjs(session.data.refresh_expires_in),
          };

          console.log("user", user);

          return user;
        } catch (error) {
          if (error instanceof AxiosError) {
            console.error("Axios error occurred:", error.response?.data);
          } else if (error instanceof ZodError) {
            console.error("Validation error occurred:", error.errors);
          } else {
            console.error("An unknown error occurred:", error);
          }
          return null;
        }
      },
    }),
  ],
});
