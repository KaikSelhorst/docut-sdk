type HttpHeaders = Bun.HeadersInit;
type HttpBaseUrl = string;
type HttpQueryParams = Record<string, string>;
type HttpInit = RequestInit & { queryParams?: HttpQueryParams };

export class Http {
  private responseHelper = new HttpResponseHelper();
  constructor(
    private readonly baseURL: HttpBaseUrl,
    private readonly headers: HttpHeaders = new Headers()
  ) {}

  private mountURL(endpoint: string) {
    return `${this.baseURL}${endpoint}`;
  }

  private mountRequestHeaders(headers?: HttpHeaders) {
    return Object.assign(this.headers, headers);
  }

  private mountRequest(endpoint: string, init: HttpInit = {}) {
    const { headers, ...restInit } = init;

    const finalEndpoint = this.mountURL(endpoint);
    const finalHeaders = this.mountRequestHeaders(headers);

    return new Request(finalEndpoint, { headers: finalHeaders, ...restInit });
  }

  private async handleResponse<S, E>(resPromise: Promise<Response>) {
    const res = await resPromise;
    const body = await this.responseHelper.extractBody(res);

    if (res.ok) {
      return { success: true, data: body as S } as const;
    }

    return { success: false, error: body as E } as const;
  }

  public request<S, E>(endpoint: string, init?: HttpInit) {
    const request = this.mountRequest(endpoint, init);
    return this.handleResponse<S, E>(fetch(request));
  }
}

class HttpResponseHelper {
  public async extractBody(res: Response) {
    try {
      const body = await res.json();
      return body;
    } catch {
      return { message: null };
    }
  }
}
