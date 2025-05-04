import { SiteSettingResponse } from "@/interface/site-setting.interface";
import { fetchAPI } from "@/util/strapi.util";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SocialIcon from "./SocialIcon";

async function getFooterData() {
  try {
    const response = await fetchAPI<SiteSettingResponse>("/site-setting", {
      fields: ["SiteDescription"],
      populate: {
        Footer: {
          populate: "*",
        },
        SocialLinks: {
          populate: "*",
        },
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return {
      Footer: {
        CopyrightText: "© 2025 trilm’s space. All rights reserved.",
      },
      SocialLinks: [
        {
          Platform: "Github",
          URL: "https://github.com/crazyads69",
        },
        {
          Platform: "Linkedin",
          URL: "https://linkedin.com/in/trilm",
        },
        {
          Platform: "Facebook",
          URL: "https://facebook.com/leminhtri.dev",
        },
      ],
      SiteDescription:
        "Blog viết về techstack JavaScript của một đứa ghét JavaScript.",
    };
  }
}

export default async function Footer() {
  const siteData = await getFooterData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`w-full bg-background border-t mt-auto`}>
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between gap-8 py-8">
        {/* About section */}
        <div className="space-y-3 md:w-1/3 text-center md:text-left">
          <h3 className="text-base font-semibold tracking-tight">About</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {siteData.SiteDescription ||
              "I'm a writer and developer sharing my thoughts on technology, design, and life."}
          </p>
        </div>

        {/* Quick links */}
        <div className="space-y-3 text-center md:text-left">
          <h3 className="text-base font-semibold tracking-tight">
            Quick Links
          </h3>
          <nav className="flex flex-col md:items-start items-center space-y-2">
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/post"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              All Posts
            </Link>
          </nav>
        </div>
        <div className="space-y-3 text-center md:text-left">
          <h3 className="text-base font-semibold tracking-tight">Connect</h3>
          <div className="flex justify-center md:justify-start space-x-2">
            {siteData.SocialLinks && siteData.SocialLinks.length > 0 ? (
              siteData.SocialLinks.map((link, index) => (
                <SocialIcon
                  key={index}
                  platform={link.Platform}
                  url={link.URL}
                />
              ))
            ) : (
              <>
                <SocialIcon
                  platform="Github"
                  url="https://github.com/crazyads69"
                />
                <SocialIcon
                  platform="Linkedin"
                  url="https://linkedin.com/in/trilm"
                />
              </>
            )}
          </div>
        </div>
      </div>
      <Separator className="my-2 opacity-40" />
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center py-4 text-center sm:text-left">
        <p className="text-sm text-muted-foreground">
          {siteData.Footer?.CopyrightText?.replace(
            /\d{4}/,
            currentYear.toString()
          ) || `© ${currentYear} All Rights Reserved`}
        </p>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-2 sm:mt-0">
          <span>Built with</span>
          <Heart
            size={12}
            className="text-red-500 inline mx-0.5 animate-pulse"
          />
          <span>using Next.js & shadcn/ui</span>
        </div>
      </div>
    </footer>
  );
}
