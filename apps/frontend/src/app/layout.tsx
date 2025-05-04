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

  try {
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
  } catch (error) {
    console.error("Error fetching site settings:", error);

    // Fallback metadata
    return {
      title: "trilm's space | My love-hate relationship with JavaScript",
      description:
        "Blog viết về techstack JavaScript của một đứa ghét JavaScript.",
      openGraph: {
        title: "trilm's space | My love-hate relationship with JavaScript",
        description:
          "Blog viết về techstack JavaScript của một đứa ghét JavaScript.",
        images: [
          {
            url: "/fallback-image.jpg",
            width: 1200,
            height: 630,
            alt: "trilm's space fallback image",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "trilm's space | My love-hate relationship with JavaScript",
        description:
          "Blog viết về techstack JavaScript của một đứa ghét JavaScript.",
        images: [
          {
            url: "/fallback-image.jpg",
            width: 1200,
            height: 630,
            alt: "trilm's space fallback image",
          },
        ],
      },
    };
  }
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
