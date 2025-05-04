import { Github, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SocialIcon({
  platform,
  url,
}: {
  platform: string;
  url: string;
}) {
  // Map of platform names to their respective icons
  const socialIcons: Record<string, React.ReactNode> = {
    github: <Github size={18} />,
    linkedin: <Linkedin size={18} />,
    facebook: <Facebook size={18} />,
  };

  // Normalize platform name to match our map keys
  const normalizedPlatform = platform.toLowerCase();

  return (
    <Button
      variant="ghost"
      size="icon"
      asChild
      className="h-9 w-9 rounded-full bg-background hover:bg-primary/10 transition-colors duration-300"
    >
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${platform}`}
        className="group"
      >
        {socialIcons[normalizedPlatform] || (
          <span className="text-xs font-medium">
            {platform.charAt(0).toUpperCase()}
          </span>
        )}
      </Link>
    </Button>
  );
}
