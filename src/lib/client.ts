import createApiClient from "./apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error(
    "FATAL ERROR: VITE_API_BASE_URL environment variable is not set!",
  );
}

const client = createApiClient(API_BASE_URL);

export default client;
