export default {
  base: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080",
  local: process.env.NEXT_PUBLIC_AUTH_URL ?? "http://localhost:3000",
};
