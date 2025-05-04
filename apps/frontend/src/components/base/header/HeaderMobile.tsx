"use client";

import { MenuItem } from "@/interface/site-setting.interface";
import { X, Menu, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

interface HeaderMobileProps {
  menuItems: MenuItem[];
}

export default function HeaderMobile({ menuItems }: HeaderMobileProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMobileMenu}
        className="md:hidden rounded-full border-primary/20 bg-background/80 backdrop-blur-sm hover:bg-primary/10 hover:text-primary transition-colors"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 right-0 top-16 z-50 md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-b shadow-md"
          >
            <div className="container mx-auto py-4 px-6">
              <nav className="flex flex-col space-y-0">
                {menuItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.URL}
                    target={item.OpenInNewTab ? "_blank" : "_self"}
                    className="flex items-center justify-between py-3 border-b border-border/20 text-sm font-medium hover:text-primary transition-colors w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.Label}
                    {item.OpenInNewTab && (
                      <ExternalLink className="h-3 w-3 opacity-70" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
