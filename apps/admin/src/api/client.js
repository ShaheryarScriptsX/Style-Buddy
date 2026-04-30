const fallbackApiUrl = "http://localhost:4000";

export const API_URL = import.meta.env.VITE_API_URL || fallbackApiUrl;

export async function apiRequest(path, { body, token, ...options } = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}
