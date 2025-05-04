// Social Links interface
export interface SocialLink {
  id: number;
  Platform: string;
  URL: string;
}

// Open Graph Image interface
export interface OpenGraphImage {
  id: number;
  url: string;
  width: number;
  height: number;
  alternativeText: string;
}

// DefaultSEO interface
export interface DefaultSEO {
  id: number;
  MetaTitle: string;
  MetaDescription: string;
  MetaKeywords: string;
  OpenGraphImage: OpenGraphImage;
}

// MenuItem interface
export interface MenuItem {
  id: number;
  Label: string;
  URL: string;
  OpenInNewTab: boolean;
}

// MainMenu interface
export interface MainMenu {
  MenuItems: MenuItem[];
}

export interface Footer {
  id: number;
  CopyrightText: string;
}

export interface SiteSettingLocalization {
  id: number;
  SiteName: string;
  SiteDescription: string;
}

// Main SiteSetting interface
export interface SiteSetting {
  id: number;
  SiteName: string;
  SiteDescription: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  DefaultSEO: DefaultSEO;
  MainMenu: MainMenu;
  Footer: Footer;
  SocialLinks: SocialLink[];
}

export interface SiteSettingResponse {
  data: SiteSetting;
  meta: Record<string, unknown>;
}
