import _api from "../setting/api";

const api = (path: string) => {
  const baseUrl = _api.base.trim();
  const trimmedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const trimmedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${trimmedBaseUrl}/${trimmedPath}`;
};

export default api;