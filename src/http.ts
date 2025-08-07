import type { HeadersInit } from 'bun';

/**
 * Type representing the base URL for the HTTP client.
 */
type HttpBaseUrl = string;

/**
 * Type representing query parameters in an HTTP request.
 */
type HttpQueryParams = Record<string, string>;

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
    try {
      const body = await res.json();
      return body;
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

  /**
   * Constructs an instance of the `Http` class.
   * @param baseURL The base URL for all HTTP requests.
   * @param headers Optional default headers to be applied to every request.
   */
  constructor(
    private readonly baseURL: HttpBaseUrl,
    private readonly headers: HeadersInit = new Headers()
  ) {}

  /**
   * Constructs the full URL by combining the base URL with a specific endpoint.
   * @param endpoint The relative path of the endpoint.
   * @returns The full URL.
   */
  private mountURL(endpoint: string): string {
    return `${this.baseURL}${endpoint}`;
  }

  /**
   * Merges default headers with any headers provided at request time.
   * @param headers Optional headers for a specific request.
   * @returns The merged headers object.
   */
  private mountRequestHeaders(headers?: HeadersInit): HeadersInit {
    return Object.assign(this.headers, headers);
  }

  /**
   * Constructs a `Request` object with the given endpoint and init options.
   * @param endpoint The relative path of the endpoint.
   * @param init Optional fetch init configuration.
   * @returns A `Request` object ready for use in a fetch call.
   */
  private mountRequest(endpoint: string, init: HttpInit = {}): Request {
    const { headers, ...restInit } = init;

    const finalEndpoint = this.mountURL(endpoint);
    const finalHeaders = this.mountRequestHeaders(headers);

    return new Request(finalEndpoint, { headers: finalHeaders, ...restInit });
  }

  /**
   * Handles the response from a fetch request, extracting and returning typed success or error responses.
   * @param resPromise A promise that resolves to a fetch `Response` object.
   * @returns An object indicating whether the request was successful, with typed data or error.
   */
  private async handleResponse<S, E>(
    resPromise: Promise<Response>
  ): Promise<{ success: true; data: S } | { success: false; error: E }> {
    const res = await resPromise;
    const body = await this.responseHelper.extractBody(res);

    if (res.ok) {
      return { success: true, data: body as S } as const;
    }

    return { success: false, error: body as E } as const;
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
    init?: HttpInit
  ): Promise<{ success: true; data: S } | { success: false; error: E }> {
    const request = this.mountRequest(endpoint, init);
    return this.handleResponse<S, E>(fetch(request));
  }
}
