import { SiteSettingResponse } from "@/interface/site-setting.interface";
import { fetchAPI } from "@/util/strapi.util";
import Link from "next/link";
import { Github, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Fetch function for server component
async function getFooterData() {
  try {
    const response = await fetchAPI<SiteSettingResponse>("/site-setting", {
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
        CopyrightText: "© 2025 All Rights Reserved",
      },
      SocialLinks: [],
    };
  }
}

export default async function Footer() {
  const siteData = await getFooterData();

  // Map for social icons
  const socialIcons: { [key: string]: React.ReactNode } = {
    github: <Github size={18} />,
    linkedin: <Linkedin size={18} />,
    facebook: <Facebook size={18} />,
  };

  return (
    <footer className="w-full bg-background border-t mt-auto">
      <div className=" mx-auto py-4 px-4">
        <div className="container gap-8">
          {/* Connect section */}
          <div className="space-y-3 w-full">
            <h3 className="text-base font-medium items-center text-center">
              Connect with me
            </h3>
            <div className="flex space-x-2 justify-center">
              {siteData.SocialLinks &&
                siteData.SocialLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-8 w-8 rounded-full"
                  >
                    <Link
                      href={link.URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.Platform}
                    >
                      {socialIcons[link.Platform.toLowerCase()] || (
                        <span className="text-xs">
                          {link.Platform.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </Link>
                  </Button>
                ))}
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="container flex flex-col sm:flex-row justify-center items-center ">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            {siteData.Footer?.CopyrightText || "© 2025 All Rights Reserved"}
          </p>
        </div>
      </div>
    </footer>
  );
}
