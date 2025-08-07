import type { Http } from '../../http';
import type { APIError } from '../types';
import type {
  CreateLinkResponseSuccess,
  CreatelinkRequest,
  DeleteLinkRequest,
  DeleteLinkResponseSuccess,
  GetLinkRequest,
  GetLinkResponseSuccess,
  UpdateLinkRequest,
  UpdateLinkResponseSuccess,
} from './protocols';

export class LinkService {
  constructor(private readonly http: Http) {}

  public create(req: CreatelinkRequest) {
    return this.http.request<CreateLinkResponseSuccess, APIError>(
      '/dashboard/link',
      { body: JSON.stringify(req), method: 'POST' }
    );
  }

  public get(req: GetLinkRequest) {
    return this.http.request<GetLinkResponseSuccess, APIError>(
      `/dashboard/link/${req.id}`
    );
  }

  public update(req: UpdateLinkRequest) {
    return this.http.request<UpdateLinkResponseSuccess, APIError>(
      `/dashboard/link/${req.id}`,
      {
        body: JSON.stringify(req),
        method: 'PUT',
      }
    );
  }

  public delete(req: DeleteLinkRequest) {
    return this.http.request<DeleteLinkResponseSuccess, APIError>(
      `/dashboard/link/${req.id}`,
      { method: 'DELETE' }
    );
  }
}
