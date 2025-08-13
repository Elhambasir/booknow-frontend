type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

export interface FetchAPIOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  authToken?: string;
  body?: Record<string, unknown>;
  next?: NextFetchRequestConfig;
}

export async function fetchAPI<T>(url: string, options: FetchAPIOptions) {
  const { method, authToken, body, next } = options;
  const headers: RequestInit & { next?: NextFetchRequestConfig } = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
    ...(next && { next }),
  };

  try {
    const response = await fetch(url, headers);
    const contentType = response.headers.get("content-type");
    if (
      contentType &&
      contentType.includes("application/json") &&
      response.ok
    ) {
      return await response.json();
    } else {
      const res = await response.json();
      return { status: response.status, statusText: response.statusText, message: res.error.message };
    }
  } catch (error) {
    console.error(`Error ${method} data:`, error);
    throw error;
  }
}