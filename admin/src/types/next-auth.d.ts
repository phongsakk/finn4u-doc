import NextAuth from "next-auth";

// ✅ ขยาย Type ของ `User`
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    image: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiredAt: dayjs.Dayjs;
    refreshTokenExpiredAt: dayjs.Dayjs;
  }

  interface Session {
    user: User;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    refreshTokenExpires: number;
    error: unknown;
  }

}

// ✅ ขยาย Type ของ JWT Token
declare module "next-auth" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    refreshToken?: string
    accessTokenExpiredAt: dayjs.Dayjs;
    expiredAt: dayjs.Dayjs;
    error?: "RefreshTokenError"
  }
}
