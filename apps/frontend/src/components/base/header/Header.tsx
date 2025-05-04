import { SiteSettingResponse } from "@/interface/site-setting.interface";
import { fetchAPI } from "@/util/strapi.util";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { SearchIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import HeaderMobile from "./HeaderMobile";

// Fetch function for server component
async function getMenuItems() {
  try {
    const response = await fetchAPI<SiteSettingResponse>("/site-setting", {
      populate: {
        MainMenu: {
          populate: {
            MenuItems: {
              fields: ["Label", "URL", "OpenInNewTab"],
            },
          },
        },
      },
    });

    return response.data.MainMenu.MenuItems;
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return [];
  }
}

export default async function Header() {
  const menuItems = await getMenuItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between py-4">
        {/* Logo section */}
        <div className="flex-1 flex justify-start">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href="/"
              className="flex items-center group"
              aria-label="Go to homepage"
            >
              <div className="overflow-hidden rounded-sm">
                <Image
                  src="/logo.svg"
                  alt="trilm's space logo"
                  width={150}
                  height={80}
                  priority
                  className="transition-all duration-500 ease-out transform group-hover:scale-110 h-auto"
                />
              </div>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <NavigationMenu className="relative">
            <NavigationMenuList className="hidden md:flex gap-1 rounded-full border px-2 py-1 shadow-sm bg-background">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.id}>
                  <NavigationMenuLink
                    href={item.URL}
                    target={item.OpenInNewTab ? "_blank" : "_self"}
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-medium",
                      "transition-colors hover:bg-primary hover:text-primary-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      "data-[active]:bg-primary/90 data-[active]:text-primary-foreground",
                      "disabled:pointer-events-none disabled:opacity-50"
                    )}
                  >
                    {item.Label}
                    {item.OpenInNewTab && (
                      <ExternalLink className="ml-1 h-3 w-3 opacity-70" />
                    )}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
            <NavigationMenuViewport className="origin-top-center relative mt-2" />
          </NavigationMenu>
        </div>
        <div className="flex-1 flex justify-end items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-primary/10 transition-colors"
            aria-label="Search"
          >
            <SearchIcon className="h-5 w-5" />
          </Button>
          <HeaderMobile menuItems={menuItems} />
        </div>
      </div>
    </header>
  );
}
