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
import { Menu, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <header className="w-full border-b bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between py-4">
        <div className="flex-1 flex justify-start">
          <div className="flex items-center gap-2 flex-shrink-0 group">
            <Link
              href="/"
              className="flex items-center pointer-events-auto"
              passHref
            >
              <div className="cursor-pointer">
                <Image
                  src="/logo.svg"
                  alt="trilm's space logo"
                  width={150}
                  height={80}
                  priority
                  className="transition-all duration-300 ease-in-out transform group-hover:scale-105 h-auto"
                />
              </div>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <NavigationMenu>
            <NavigationMenuList className="hidden md:flex">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.id}>
                  <NavigationMenuLink
                    href={item.URL}
                    target={item.OpenInNewTab ? "_blank" : "_self"}
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    {item.Label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
            <NavigationMenuViewport />
          </NavigationMenu>
        </div>
        <div className="flex-1 flex justify-end items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <SearchIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
