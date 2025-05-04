import { Article } from "../../interface/article.interface";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { calculateReadTime } from "@/util/article.util";
import { getStrapiMedia } from "@/util/strapi.util";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ClockIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

interface CardPostProps {
  latestArticles: Article[];
}

export default function CardPost({ latestArticles }: CardPostProps) {
  return (
    <div className="w-full py-10">
      <div className="pb-6">
        <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-background shadow-sm">
          <span className="text-foreground font-medium">Other Posts</span>
        </div>
      </div>
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestArticles.map((article) => (
            <Card
              key={article.id}
              className="flex flex-col h-full overflow-hidden border-border hover:shadow-md transition-all duration-300"
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
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />

                {article.categories && article.categories.length > 0 && (
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <Badge
                      variant="secondary"
                      className="bg-background/80 backdrop-blur-sm text-xs font-medium"
                    >
                      {article.categories[0].Name}
                    </Badge>
                  </div>
                )}
              </Link>
              <CardContent className="flex-grow flex flex-col justify-between p-4">
                <div className="space-y-2">
                  <Link href={`/post/${article.Slug}`}>
                    <CardTitle className="text-lg line-clamp-2 hover:text-primary transition-colors">
                      {article.Title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {article.Summary}
                    </CardDescription>
                  </Link>
                </div>
                <div className="flex justify-between items-center pt-4 mt-2 border-t border-border/40">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={getStrapiMedia(article.author.Avatar?.url) || ""}
                        alt={article.author.Name}
                      />
                      <AvatarFallback className="text-xs">
                        {article.author.Name}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-xs text-muted-foreground">
                      <span className="text-foreground font-medium">
                        {article.author.Name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <ClockIcon className="mr-1 h-3 w-3" />
                    <span>{calculateReadTime(article.Content)} min read</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="group rounded-full hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <Link href="/post">
              View more posts
              <ArrowRightIcon className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
