import "./globals.css";
import { Be_Vietnam_Pro } from "next/font/google";
import { SiteSettingResponse } from "@/interface/site-setting.interface";
import { fetchAPI } from "@/util/strapi.util";
import { getStrapiMedia } from "../util/strapi.util";

const bevietPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  variable: "--font-bev-pro",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata() {
  // Fetch site settings
  const response = await fetchAPI<SiteSettingResponse>("/site-setting", {
    fields: ["SiteName", "SiteDescription"],
    populate: {
      DefaultSEO: {
        fields: ["MetaTitle", "MetaDescription", "MetaKeywords"],
        populate: {
          OpenGraphImage: {
            fields: ["url", "width", "height", "alternativeText"],
          },
        },
      },
    },
  });

  return {
    title: response.data.DefaultSEO.MetaTitle,
    description: response.data.DefaultSEO.MetaDescription,
    openGraph: {
      title: response.data.DefaultSEO.MetaTitle,
      description: response.data.DefaultSEO.MetaDescription,
      images: [
        {
          url: getStrapiMedia(response.data.DefaultSEO.OpenGraphImage.url),
          width: response.data.DefaultSEO.OpenGraphImage.width,
          height: response.data.DefaultSEO.OpenGraphImage.height,
          alt: response.data.DefaultSEO.OpenGraphImage.alternativeText,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: response.data.DefaultSEO.MetaTitle,
      description: response.data.DefaultSEO.MetaDescription,
      images: [
        {
          url: getStrapiMedia(response.data.DefaultSEO.OpenGraphImage.url),
          width: response.data.DefaultSEO.OpenGraphImage.width,
          height: response.data.DefaultSEO.OpenGraphImage.height,
          alt: response.data.DefaultSEO.OpenGraphImage.alternativeText,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
  };
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${bevietPro.className} antialiased`}>{children}</body>
    </html>
  );
}
