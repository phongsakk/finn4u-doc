import settingApi from "@setting/api";

export const api = {
  internal: (path: string) => {
    const baseUrl = settingApi.local.trim();
    const trimmedBaseUrl = baseUrl.endsWith("/")
      ? baseUrl.slice(0, -1)
      : baseUrl;
    const trimmedPath = path.startsWith("/") ? path.slice(1) : path;
    return `${trimmedBaseUrl}/${trimmedPath}`;
  },
  external: (path: string) => {
    const baseUrl = settingApi.base.trim();
    const trimmedBaseUrl = baseUrl.endsWith("/")
      ? baseUrl.slice(0, -1)
      : baseUrl;
    const trimmedPath = path.startsWith("/") ? path.slice(1) : path;
    return `${trimmedBaseUrl}/${trimmedPath}`;
  },
};
