export type Link = {
  id: string;
  url: string;
  expiration: string | null;
  createdAt: string;
  updatedAt: string;
  clicks: number;
};

export type Seo = {
  id: string;
  title: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  linkId: string;
};

export type APIError = {
  message: string;
};
