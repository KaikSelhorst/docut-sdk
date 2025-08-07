import { Http } from './http';
import { LinkService } from './services/link';

export class DocutSDK {
  private http: Http;
  public link: LinkService;
  constructor(baseURL: string, apiKey: string) {
    this.http = new Http(baseURL, { 'x-api-key': apiKey });
    this.link = new LinkService(this.http);
  }
}
