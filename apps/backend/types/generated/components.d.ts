import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsFooter extends Struct.ComponentSchema {
  collectionName: 'components_components_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    CopyrightText: Schema.Attribute.String & Schema.Attribute.Required;
    FooterColumns: Schema.Attribute.Component<'components.footer-column', true>;
  };
}

export interface ComponentsFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_components_footer_columns';
  info: {
    displayName: 'FooterColumn';
  };
  attributes: {
    Links: Schema.Attribute.Component<'components.menu-item', true>;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentsMainMenu extends Struct.ComponentSchema {
  collectionName: 'components_components_main_menus';
  info: {
    displayName: 'MainMenu';
  };
  attributes: {
    MenuItems: Schema.Attribute.Component<'components.menu-item', true> &
      Schema.Attribute.Required;
  };
}

export interface ComponentsMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_components_menu_items';
  info: {
    description: '';
    displayName: 'MenuItem';
  };
  attributes: {
    Label: Schema.Attribute.String & Schema.Attribute.Required;
    OpenInNewTab: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    URL: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentsSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_components_social_links';
  info: {
    displayName: 'SocialLink';
  };
  attributes: {
    Platform: Schema.Attribute.Enumeration<['github', 'linkedin', 'facebook']>;
    URL: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'SEO';
    icon: '';
  };
  attributes: {
    MetaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    MetaKeywords: Schema.Attribute.String & Schema.Attribute.Required;
    MetaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    OpenGraphImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'components.footer': ComponentsFooter;
      'components.footer-column': ComponentsFooterColumn;
      'components.main-menu': ComponentsMainMenu;
      'components.menu-item': ComponentsMenuItem;
      'components.social-link': ComponentsSocialLink;
      'seo.seo': SeoSeo;
    }
  }
}
