import {
  SiteSetting,
  SiteSettingResponse,
} from "@/interface/site-setting.interface";
import { fetchAPI } from "@/util/strapi.util";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { MoonIcon, SunIcon, Menu, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/base/header/Header";
import Footer from "@/components/base/footer/Footer";

export default async function RootPage() {
  // Redirect to your default locale
  // Fetch site settings
  const response = await fetchAPI<SiteSettingResponse>("/site-setting", {
    populate: {
      MainMenu: {
        populate: {
          MenuItems: {
            fields: ["Label", "URL", "OpenInNewTab"],
          },
        },
      },
      Footer: {
        fields: ["CopyrightText"],
      },
    },
  });

  return (
    <main className="flex flex-col items-center justify-between container mx-auto min-h-screen py-10">
      <h1 className="text-3xl font-bold">Hello, world!</h1>
      <p className="mt-4 text-lg">Welcome to our website!</p>
    </main>
  );
}
