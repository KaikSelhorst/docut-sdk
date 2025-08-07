import { Http } from './http';
import { LinkService } from './services/link';

/**
 * Main SDK class to interact with the Docut API.
 *
 * Initialize it with the API base URL and a valid API key.
 *
 * Example usage:
 * ```ts
 * const sdk = new DocutSDK('https://docut.xyz/api', 'your-api-key');
 * const result = await sdk.link.get('abc123');
 * ```
 */
export class DocutSDK {
  /**
   * Internal HTTP client used for making requests.
   */
  private http: Http;

  /**
   * Service for link-related operations.
   */
  public link: LinkService;

  /**
   * Creates a new instance of the Docut SDK.
   *
   * @param baseURL The base URL of the API (e.g. `https://api.docut.com/v1`)
   * @param apiKey The API key used for authentication (sent as `x-api-key` header)
   */
  constructor(baseURL: string, apiKey: string) {
    this.http = new Http(baseURL, { 'x-api-key': apiKey });
    this.link = new LinkService(this.http);
  }
}
