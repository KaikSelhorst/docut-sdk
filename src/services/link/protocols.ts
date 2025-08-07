import type { Link, Seo } from '../types';

export interface CreatelinkRequest {
  url: string;
  expiration?: null | string;
  seo?: Partial<{
    description: string | null;
    title: string | null;
  }>;
}

export interface CreateLinkResponseSuccess extends Link {
  seo: Seo;
}

export interface GetLinkRequest {
  id: string;
}

export interface GetLinkResponseSuccess extends Link {
  seo: Seo;
}

export type DeleteLinkRequest = { id: string };
export type DeleteLinkResponseSuccess = { id: string };

export interface UpdateLinkRequest {
  id: string;
  url?: string;
  expiration?: null | string;
  seo?: Partial<{ description: null | string; title: null | string }>;
}

export interface UpdateLinkResponseSuccess extends Link {
  seo: Seo;
}
