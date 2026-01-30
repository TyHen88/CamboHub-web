import { getIdToken } from "@/lib/auth/client";

type HttpOptions = {
  headers?: HeadersInit;
  token?: string;
  auth?: boolean;
};

async function request<T>(
  url: string,
  {
    method,
    body,
    headers,
    token,
    auth,
  }: HttpOptions & { method: string; body?: unknown },
) {
  const resolvedToken = token ?? (auth ? await getIdToken() : undefined);
  const mergedHeaders = new Headers(headers);
  if (resolvedToken) {
    mergedHeaders.set("Authorization", `Bearer ${resolvedToken}`);
  }
  if (body !== undefined && !mergedHeaders.has("Content-Type")) {
    mergedHeaders.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    method,
    headers: mergedHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await response.text();
  const data = text ? (JSON.parse(text) as T) : (null as T);

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "error" in data
        ? String((data as { error?: unknown }).error)
        : response.statusText;
    throw new Error(message || "Request failed");
  }

  return data;
}

export const http = {
  get: <T>(url: string, options: HttpOptions = {}) =>
    request<T>(url, { ...options, method: "GET" }),
  post: <T>(url: string, body: unknown, options: HttpOptions = {}) =>
    request<T>(url, { ...options, method: "POST", body }),
  put: <T>(url: string, body: unknown, options: HttpOptions = {}) =>
    request<T>(url, { ...options, method: "PUT", body }),
  patch: <T>(url: string, body: unknown, options: HttpOptions = {}) =>
    request<T>(url, { ...options, method: "PATCH", body }),
  delete: <T>(url: string, options: HttpOptions = {}) =>
    request<T>(url, { ...options, method: "DELETE" }),
};
