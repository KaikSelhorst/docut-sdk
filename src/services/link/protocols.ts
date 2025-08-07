import type { Link, Seo } from '../types';

/**
 * Request payload for creating a new link.
 */
export interface CreatelinkRequest {
  /**
   * The target URL to shorten or track.
   */
  url: string;

  /**
   * Optional expiration date as an ISO string. If `null` or undefined, the link does not expire.
   */
  expiration?: null | string;

  /**
   * Optional SEO metadata for the link.
   */
  seo?: Partial<{
    /**
     * Optional SEO description.
     */
    description: string | null;

    /**
     * Optional SEO title.
     */
    title: string | null;
  }>;
}

/**
 * Successful response after creating a link.
 * Includes the full `Link` object and associated SEO metadata.
 */
export interface CreateLinkResponseSuccess extends Link {
  /**
   * SEO metadata associated with the link.
   */
  seo: Seo;
}

/**
 * Request to retrieve a link by its ID.
 */
export interface GetLinkRequest {
  /**
   * Unique ID of the link to retrieve.
   */
  id: string;
}

/**
 * Successful response when fetching a link.
 */
export interface GetLinkResponseSuccess extends Link {
  /**
   * SEO metadata associated with the link.
   */
  seo: Seo;
}

/**
 * Request to delete a link by its ID.
 */
export type DeleteLinkRequest = {
  /**
   * Unique ID of the link to delete.
   */
  id: string;
};

/**
 * Successful response after deleting a link.
 */
export type DeleteLinkResponseSuccess = {
  /**
   * ID of the link that was deleted.
   */
  id: string;
};

/**
 * Request to update an existing link.
 */
export interface UpdateLinkRequest {
  /**
   * ID of the link to update.
   */
  id: string;

  /**
   * Optional updated URL.
   */
  url?: string;

  /**
   * Optional updated expiration date. `null` means no expiration.
   */
  expiration?: null | string;

  /**
   * Optional updated SEO metadata.
   */
  seo?: Partial<{
    /**
     * Updated SEO description.
     */
    description: string | null;

    /**
     * Updated SEO title.
     */
    title: string | null;
  }>;
}

/**
 * Successful response after updating a link.
 */
export interface UpdateLinkResponseSuccess extends Link {
  /**
   * Updated SEO metadata.
   */
  seo: Seo;
}
