// Image format interface
export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

// Cover Image interface
export interface CoverImage {
  id: number;
  url: string;
  width: number;
  height: number;
  alternativeText: string;
}

// Category interface
export interface Category {
  id: number;
  Name: string;
  Slug: string;
  Description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Tag interface
export interface Tag {
  id: number;
  Name: string;
  Slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface OpenGraphImage {
  id: number;
  url: string;
  width: number;
  height: number;
  alternativeText: string;
}

// Author interface
export interface Author {
  id: number;
  Name: string;
  Bio: string;
  Email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

// SEO interface
export interface SEO {
  id: number;
  MetaTitle: string;
  MetaDescription: string;
  MetaKeywords: string;
  OpenGraphImage: OpenGraphImage;
}

// Main Article interface
export interface Article {
  id: number;
  documentId: string;
  Title: string;
  Slug: string;
  Content: string;
  Summary: string;
  IsFeatured: boolean;
  Language: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  CoverImage: CoverImage;
  categories: Category[];
  tags: Tag[];
  author: Author;
  SEO: SEO;
}

// Single article response wrapper
export interface ArticleResponse {
  data: Article;
  meta: Record<string, any>;
}

// Article collection response
export interface ArticlesResponse {
  data: Article[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
