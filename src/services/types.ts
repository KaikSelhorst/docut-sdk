/**
 * Represents a shortened or tracked link.
 */
export type Link = {
  /**
   * Unique identifier of the link.
   */
  id: string;

  /**
   * The original or destination URL.
   */
  url: string;

  /**
   * Optional expiration date as an ISO string. `null` means the link doesn't expire.
   */
  expiration: string | null;

  /**
   * The ISO string representing when the link was created.
   */
  createdAt: string;

  /**
   * The ISO string representing when the link was last updated.
   */
  updatedAt: string;

  /**
   * Number of times the link has been clicked.
   */
  clicks: number;
};

/**
 * Represents SEO metadata associated with a link.
 */
export type Seo = {
  /**
   * Unique identifier for the SEO entry.
   */
  id: string;

  /**
   * Optional title for the link, used for SEO.
   */
  title: string | null;

  /**
   * Optional description for the link, used for SEO.
   */
  description: string | null;

  /**
   * The ISO string representing when the SEO entry was created.
   */
  createdAt: string;

  /**
   * The ISO string representing when the SEO entry was last updated.
   */
  updatedAt: string;

  /**
   * The ID of the link this SEO metadata is associated with.
   */
  linkId: string;
};

/**
 * Represents an error returned by the API.
 */
export type APIError = {
  /**
   * Human-readable error message.
   */
  message: string;
};
