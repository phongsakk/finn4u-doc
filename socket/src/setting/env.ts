const ENV_READER = {
  API_VERSION: process.env.API_VERSION ?? "v0.0.0",
  HTTP_PORT: process.env.HTTP_PORT ?? "3000",
  HTTP_ALLOW_ORIGIN:
    process.env.HTTP_ALLOW_ORIGIN ??
    "http://localhost:5173|http://localhost:5174",
  SOCKET_PREFIX: process.env.SOCKET_PREFIX ?? "",
};

type DotEnvKeys = keyof typeof ENV_READER;

export const env = (key: DotEnvKeys, def: string = "") => {
  return ENV_READER[key] ?? def;
};
