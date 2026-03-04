enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type RequestOptions = {
  body?: unknown;
  headers?: HeadersInit;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const buildRequestUrl = (path: string, params?: Record<string, string>) => {
  const base = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;

  if (!params) {
    return base;
  }

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `${base}?${query}` : base;
};

const fetchRequest = async <T>(method: HttpMethod, path: string, options: RequestOptions = {}): Promise<T> => {
  const { headers, body } = options;

  const fetchOptions: RequestInit = {
    body: JSON.stringify(body),
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    credentials: 'include'
  };

  const data = await fetch(path, fetchOptions);

  return data.json();
};


export const api = {
  get<T>(path: string, options?: RequestOptions) {
    return fetchRequest<T>(HttpMethod.GET, path, options);
  },
  post<T>(path: string, options?: RequestOptions) {
    return fetchRequest<T>(HttpMethod.POST, path, options);
  },
  put<T>(path: string, options?: RequestOptions) {
    return fetchRequest<T>(HttpMethod.PUT, path, options);
  },
  patch<T>(path: string, options?: RequestOptions) {
    return fetchRequest<T>(HttpMethod.PATCH, path, options);
  },
  delete<T>(path: string, options?: RequestOptions) {
    return fetchRequest<T>(HttpMethod.DELETE, path, options);
  },
};