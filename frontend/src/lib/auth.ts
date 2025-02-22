import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
import api from "@utils/api";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async ({ email, password }) => {
        try {
          const response = await axios.post(api("/v1/auth/login"), {
            email,
            password,
          });

          const user = response.data;

          return {
            name: user?.name || email,
            email: user?.email || email,
            token: user?.token,
          };
        } catch (error) {
          if (error instanceof AxiosError) {
            console.log(error?.response?.data);
          }
          return { message: "12123" };
        }
      },
    }),
  ],
});
