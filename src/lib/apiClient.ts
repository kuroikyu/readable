type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type AuthToken = string | null;

interface ApiClient {
  get: <T>(url: string, params?: Record<string, string>) => Promise<T>;
  post: <U, T>(url: string, data: U) => Promise<T>;
  put: <U, T>(url: string, data: U) => Promise<T>;
  patch: <U, T>(url: string, data: U) => Promise<T>;
  delete: <T>(url: string, params?: Record<string, string>) => Promise<T>;
  setAuthToken: (token: AuthToken) => void;
}

function createApiClient(baseUrl: string): ApiClient {
  let authToken: AuthToken = null;
  const request = async <T, U>(
    url: string,
    method: HttpMethod,
    data?: U,
    params?: Record<string, string>,
  ): Promise<T> => {
    const fullUrl = `${baseUrl}${url}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    const body = data ? JSON.stringify(data) : undefined;
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";

    const response = await fetch(`${fullUrl}${queryString}`, {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      let errorData: unknown;
      try {
        errorData = await response.json();
      } catch (err) {
        throw new Error(
          `HTTP error. Status: ${response.status}. Error: ${err}`,
        );
      }
      throw new Error(
        `HTTP error. Status: ${response.status}. Error ${JSON.stringify(errorData)}`,
      );
    }

    return response.json() as Promise<T>;
  };

  const setAuthToken = (token: AuthToken) => {
    authToken = token;
  };

  return {
    get: <T>(url: string, params?: Record<string, string>) =>
      request<never, T>(url, "GET", undefined, params),
    post: <U, T>(url: string, data: U) => request<T, U>(url, "POST", data),
    put: <U, T>(url: string, data: U) => request<T, U>(url, "PUT", data),
    patch: <U, T>(url: string, data: U) => request<T, U>(url, "PATCH", data),
    delete: <T>(url: string, params?: Record<string, string>) =>
      request<never, T>(url, "DELETE", undefined, params),
    setAuthToken,
  };
}

export default createApiClient;
