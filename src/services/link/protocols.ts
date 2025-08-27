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

/**
 * Request payload for listing links with optional filtering and sorting.
 */
export type ListLinkRequest = Partial<{
  /**
   * Field to sort the links by.
   * Can be one of: 'clicks', 'url', 'expiration', 'created_at', or 'id'.
   */
  sort_by: 'clicks' | 'url' | 'expiration' | 'created_at' | 'id';

  /**
   * Direction of sorting.
   * Can be 'asc' for ascending or 'desc' for descending.
   */
  sort_direction: 'asc' | 'desc';

  /**
   * Number of links to return per page.
   */
  per_page: number;

  /**
   * Unique ID of a specific link to filter by.
   */
  id: string;

  /**
   * Page number for pagination.
   */
  page: number;
}>;

/**
 * Interface for a listed link, extending the base `Link` type with SEO metadata.
 */
interface LinkListed extends Link {
  /**
   * SEO metadata associated with the listed link, including title and description.
   */
  seo: Pick<Seo, 'title' | 'description'>;
}

/**
 * Successful response when listing links.
 * Contains an array of links and pagination metadata.
 */
export interface ListLinkResponseSuccess {
  /**
   * Array of links with their associated SEO metadata.
   */
  links: LinkListed[];

  /**
   * Total number of links matching the request criteria.
   */
  total: number;

  /**
   * Number of links returned per page.
   */
  per_page: number;

  /**
   * Total number of pages available based on the request criteria.
   */
  total_pages: number;
}

/**
 * Request to retrieve a public link by its ID.
 */
export interface GetPublicLinkRequest {
  /**
   * Unique ID of the public link to retrieve.
   */
  id: string;
}

/**
 * Successful response when fetching a public link.
 * Includes a subset of `Link` properties and associated SEO metadata.
 */
export interface GetPublicLinkResponseSuccess extends Pick<Link, 'id' | 'url'> {
  /**
   * SEO metadata associated with the public link, including title and description.
   */
  seo: Pick<Seo, 'description' | 'title'>;
}
