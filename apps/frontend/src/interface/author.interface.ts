import { OpenGraphImage, SocialLink } from "./site-setting.interface";

export interface Author {
  id: number;
  Name: string;
  Bio: string;
  Email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  Avatar: OpenGraphImage;
  SocialLinks: SocialLink[];
}

// Author response wrapper
export interface AuthorResponse {
  data: Author[];
  meta: Record<string, unknown>;
}

// Collection of authors response
export interface AuthorsResponse {
  data: Author[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
