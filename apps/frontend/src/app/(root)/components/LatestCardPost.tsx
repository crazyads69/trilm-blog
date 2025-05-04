import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Article } from "@/interface/article.interface";
import { getStrapiMedia } from "@/util/strapi.util";
import { CalendarIcon, ClockIcon, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { calculateReadTime, formatDateTime } from "@/util/article.util";

interface LatestCardPostProps {
  latestArticle: Article;
}

export default function LatestCardPost({ latestArticle }: LatestCardPostProps) {
  const articleUrl = `/post/${latestArticle.Slug}`;
  return (
    <Card
      className={`group overflow-hidden border shadow-md hover:shadow-xl transition-all duration-300 rounded-lg `}
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/5 relative aspect-[16/9] md:aspect-square overflow-hidden">
          <Link href={articleUrl} className="block h-full w-full">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={
                  getStrapiMedia(latestArticle.CoverImage.url) ||
                  "/placeholder.svg"
                }
                alt={
                  latestArticle.CoverImage.alternativeText ||
                  latestArticle.Title
                }
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 md:opacity-100" />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 md:hidden">
                {latestArticle.categories?.map((category) => (
                  <Badge
                    key={category.id}
                    variant="secondary"
                    className="bg-background/80 backdrop-blur-sm text-foreground px-2.5 py-0.5 font-medium"
                  >
                    {category.Name}
                  </Badge>
                ))}
              </div>
            </div>
          </Link>
        </div>
        <div className="w-full md:w-3/5 flex flex-col justify-between p-5 md:p-6">
          <div className="space-y-4">
            <div className="hidden md:flex flex-wrap gap-2">
              {latestArticle.categories?.map((category) => (
                <Badge
                  key={category.id}
                  variant="outline"
                  className="bg-primary/10 hover:bg-primary/20 text-primary px-2.5 py-0.5 font-medium"
                >
                  {category.Name}
                </Badge>
              ))}
            </div>
            <div className="space-y-2">
              <Link href={articleUrl} className="block group">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">
                  {latestArticle.Title}
                </CardTitle>
              </Link>
              <CardDescription className="line-clamp-3 text-sm sm:text-base text-muted-foreground">
                {latestArticle.Summary}
              </CardDescription>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
                  <span>{formatDateTime(latestArticle.publishedAt)}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="mr-1.5 h-3.5 w-3.5" />
                  <span>
                    {calculateReadTime(latestArticle.Content)} min read
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-5 pt-5 border-t border-border/30">
            <div className="flex items-center space-x-3">
              <Avatar className="h-9 w-9 border border-border">
                <AvatarImage
                  src={getStrapiMedia(latestArticle.author.Avatar?.url) || ""}
                  alt={latestArticle.author.Name}
                />
                <AvatarFallback>{latestArticle.author.Name}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium leading-none mb-1">
                  {latestArticle.author.Name}
                </div>
                <div className="text-xs text-muted-foreground">Author</div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full group/button"
              asChild
            >
              <Link href={articleUrl}>
                <span className="mr-1">Read article</span>
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
