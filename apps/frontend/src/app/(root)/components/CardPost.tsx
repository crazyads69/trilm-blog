import { Article } from "@/interface/article.interface";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { calculateReadTime, formatDateTime } from "@/util/article.util";
import { getStrapiMedia } from "@/util/strapi.util";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  CalendarIcon,
  ClockIcon,
  ArrowRightIcon,
  BookOpenIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

interface CardPostProps {
  latestArticles: Article[];
  title?: string;
  viewMoreLink?: string;
  viewMoreText?: string;
  className?: string;
}

export default function CardPost({
  latestArticles,
  title = "Other Posts",
  viewMoreLink = "/post",
  viewMoreText = "View more posts",
  className = "",
}: CardPostProps) {
  if (!latestArticles.length) return null;

  return (
    <section className={`w-full py-8 ${className}`}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <BookOpenIcon className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          </div>
          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {latestArticles.length}
          </span>
        </div>
        <Link
          href={viewMoreLink}
          className="text-sm text-muted-foreground hover:text-primary transition-colors md:hidden"
        >
          More
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
        {latestArticles.map((article, index) => (
          <Card
            key={article.id}
            className="group flex flex-col h-full overflow-hidden border hover:border-primary/20 hover:shadow-md transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Link
              href={`/post/${article.Slug}`}
              className="block overflow-hidden relative aspect-[16/10]"
            >
              <Image
                src={
                  getStrapiMedia(article.CoverImage.url) || "/placeholder.svg"
                }
                alt={article.CoverImage.alternativeText || article.Title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              {article.categories && article.categories.length > 0 && (
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                  <Badge
                    variant="secondary"
                    className="bg-background/90 backdrop-blur-sm text-xs font-medium shadow-sm"
                  >
                    {article.categories[0].Name}
                  </Badge>
                </div>
              )}
              <div className="absolute bottom-3 left-3 z-10">
                <div className="flex items-center text-xs text-background">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  <span className="font-medium">
                    {formatDateTime(article.publishedAt)}
                  </span>
                </div>
              </div>
            </Link>
            <CardContent className="flex-grow flex flex-col justify-between p-4">
              <div className="space-y-3">
                <Link
                  href={`/post/${article.Slug}`}
                  className="group/title block"
                >
                  <CardTitle className="text-lg line-clamp-2 group-hover/title:text-primary transition-colors">
                    {article.Title}
                  </CardTitle>
                </Link>

                <CardDescription className="line-clamp-2 text-sm">
                  {article.Summary}
                </CardDescription>
              </div>
              <div className="flex justify-between items-center pt-4 mt-4 border-t border-border/40">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6 border border-border/50">
                    <AvatarImage
                      src={getStrapiMedia(article.author.Avatar?.url) || ""}
                      alt={article.author.Name}
                    />
                    <AvatarFallback className="text-xs bg-primary/5">
                      {article.author.Name}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-xs">
                    <span className="font-medium">{article.author.Name}</span>
                  </div>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ClockIcon className="mr-1 h-3 w-3" />
                  <span>{calculateReadTime(article.Content)} min</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="hidden md:flex justify-center mt-10">
        <Button
          variant="outline"
          className="group rounded-full hover:bg-primary hover:text-primary-foreground"
          asChild
        >
          <Link href={viewMoreLink}>
            {viewMoreText}
            <ArrowRightIcon className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
      <div className="flex md:hidden justify-center mt-8">
        <Button
          variant="outline"
          size="sm"
          className="group rounded-full w-full hover:bg-primary hover:text-primary-foreground"
          asChild
        >
          <Link href={viewMoreLink}>
            {viewMoreText}
            <ArrowRightIcon className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
