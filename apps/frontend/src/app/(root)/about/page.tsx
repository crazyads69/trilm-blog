import { AuthorResponse } from "@/interface/author.interface";
import { fetchAPI, getStrapiMedia } from "@/util/strapi.util";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { Github, Linkedin, Twitter, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MarkdownRenderer } from "@/components/base/markdown-renderer/MarkdownRenderer";

async function getAboutData() {
  try {
    const response = await fetchAPI<AuthorResponse>("/authors", {
      fields: ["Name", "Bio", "Email"],
      populate: {
        Avatar: {
          fields: ["url", "alternativeText", "width", "height"],
        },
        SocialLinks: {
          populate: "*",
        },
      },
      pagination: {
        page: 1,
        pageSize: 1,
      },
    });
    return response?.data[0];
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
}

const socialIcons: Record<string, React.ReactNode> = {
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
  twitter: <Twitter size={20} />,
  email: <Mail size={20} />,
};

export default async function AboutPage() {
  const aboutData = await getAboutData();

  return (
    <main className="container mx-auto py-10 w-full animate-fade-in">
      <div className="relative w-full h-64 md:h-80 mb-16 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30">
          {aboutData?.Avatar?.url ? (
            <Image
              src={getStrapiMedia(aboutData.Avatar.url) || "/placeholder.svg"}
              alt="Cover image"
              fill
              className="object-cover z-0 opacity-80"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-secondary/10" />
          )}
        </div>

        <div className="absolute -bottom-0 left-8 flex items-end">
          <Avatar className="h-28 w-28 border-4 border-background rounded-full shadow-lg">
            <AvatarImage
              src={
                getStrapiMedia(aboutData?.Avatar?.url || "") ||
                "/placeholder.svg"
              }
              alt={aboutData?.Name}
            />
            <AvatarFallback className="text-2xl font-bold">
              {aboutData?.Name}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center md:text-left">
                {aboutData?.Name}
              </h1>
              <p className="text-muted-foreground text-sm text-center md:text-left">
                IYKW, IYKWD, IYKYK
              </p>
            </div>
            <Card className="overflow-hidden border">
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {aboutData?.Bio && (
                    <MarkdownRenderer content={aboutData.Bio} />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Connect</h2>
              {aboutData?.Email && (
                <div className="flex items-center mb-4">
                  <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                  <a
                    href={`mailto:${aboutData.Email}`}
                    className=" hover:underline text-muted-foreground"
                  >
                    {aboutData.Email}
                  </a>
                </div>
              )}
              {aboutData?.SocialLinks && aboutData.SocialLinks.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {aboutData.SocialLinks.map((link, index) => {
                    const platform = link.Platform.toLowerCase();
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="gap-2 rounded-full hover:bg-primary hover:text-primary-foreground"
                        asChild
                      >
                        <Link
                          href={link.URL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {socialIcons[platform] || <ExternalLink size={20} />}
                          <span>{link.Platform}</span>
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
