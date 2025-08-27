import type { HeadersInit } from "bun";

/**
 * Type representing the base URL for the HTTP client.
 */
type HttpBaseUrl = string;

/**
 * Type representing query parameters in an HTTP request.
 */
type HttpQueryParams = object;

/**
 * Type representing the initialization options for an HTTP request,
 * extending the native `RequestInit` with optional query parameters.
 */
type HttpInit = RequestInit & { queryParams?: HttpQueryParams };

/**
 * A helper class responsible for extracting the response body from a `Response` object.
 */
class HttpResponseHelper {
  /**
   * Extracts the response body as JSON. Returns a fallback object if parsing fails.
   * @param res The `Response` object from a fetch call.
   * @returns The parsed JSON body or a fallback object.
   */
  public async extractBody(res: Response) {
    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return { message: null };
    }

    try {
      return await res.json();
    } catch {
      return { message: null };
    }
  }
}

/**
 * A simple HTTP client wrapper for performing typed fetch requests with shared headers and base URL.
 */
export class Http {
  private responseHelper = new HttpResponseHelper();
  private baseHeaders: Headers;

  /**
   * Constructs an instance of the `Http` class.
   * @param baseURL The base URL for all HTTP requests.
   * @param headers Optional default headers to be applied to every request.
   */
  constructor(
    private readonly baseURL: HttpBaseUrl,
    headers: HeadersInit = {},
  ) {
    // Pre-processa headers uma única vez
    this.baseHeaders = new Headers(headers);
  }

  /**
   * Constructs the full URL by combining the base URL with a specific endpoint and optional query parameters.
   * Optimized version that avoids unnecessary processing when no query parameters are provided.
   * @param endpoint The relative path of the endpoint.
   * @param queryParams Optional query parameters to append to the URL.
   * @returns The complete URL string with query parameters if provided.
   */
  private buildURL(endpoint: string, queryParams?: HttpQueryParams): string {
    if (!queryParams) {
      return `${this.baseURL}${endpoint}`;
    }

    const params = queryParams as Record<string, string>;

    const searchParams = new URLSearchParams();
    let hasParams = false;

    for (const key in params) {
      if (params.hasOwnProperty(key) && params[key] != null) {
        searchParams.append(key, String(params[key]));
        hasParams = true;
      }
    }

    return hasParams
      ? `${this.baseURL}${endpoint}?${searchParams.toString()}`
      : `${this.baseURL}${endpoint}`;
  }

  /**
   * Handles the response from a fetch request, extracting and returning typed success or error responses.
   * @param resPromise A promise that resolves to a fetch `Response` object.
   * @returns An object indicating whether the request was successful, with typed data or error.
   */
  private async handleResponse<S, E>(
    resPromise: Promise<Response>,
  ): Promise<{ success: true; data: S } | { success: false; error: E }> {
    const res = await resPromise;

    // Extrai o body apenas uma vez
    const body = await this.responseHelper.extractBody(res);

    return res.ok
      ? { success: true, data: body as S }
      : { success: false, error: body as E };
  }

  /**
   * Executes a typed HTTP request to a given endpoint.
   * @template S The expected success response type.
   * @template E The expected error response type.
   * @param endpoint The relative path of the endpoint.
   * @param init Optional request initialization options, including method, headers, and query params.
   * @returns A promise resolving to a typed success or error result.
   */
  public request<S, E>(
    endpoint: string,
    init: HttpInit = {},
  ): Promise<{ success: true; data: S } | { success: false; error: E }> {
    const url = this.buildURL(endpoint, init.queryParams);

    const requestHeaders = new Headers(this.baseHeaders);
    if (init.headers) {
      const additionalHeaders = new Headers(init.headers);
      for (const [key, value] of additionalHeaders.entries()) {
        requestHeaders.set(key, value);
      }
    }

    const requestInit: RequestInit = {
      method: init.method || "GET",
      headers: requestHeaders,
      body: init.body,
      mode: init.mode,
      credentials: init.credentials,
      cache: init.cache,
      redirect: init.redirect,
      referrer: init.referrer,
      referrerPolicy: init.referrerPolicy,
      integrity: init.integrity,
      keepalive: init.keepalive,
      signal: init.signal,
    };

    return this.handleResponse<S, E>(fetch(url, requestInit));
  }
}
