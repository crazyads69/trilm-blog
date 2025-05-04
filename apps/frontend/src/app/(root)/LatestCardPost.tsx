import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Article } from "@/interface/article.interface";
import { getStrapiMedia } from "@/util/strapi.util";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { calculateReadTime, formatDateTime } from "@/util/article.util";

interface LatestCardPostProps {
  latestArticle: Article;
}

export default function LatestCardPost({ latestArticle }: LatestCardPostProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/5 relative aspect-[16/9] md:aspect-auto">
          <Link href={`/post/${latestArticle.Slug}`}>
            <div className="w-full h-full overflow-hidden">
              <Image
                src={
                  getStrapiMedia(latestArticle.CoverImage.url) ||
                  "/placeholder.svg"
                }
                alt={
                  latestArticle.CoverImage.alternativeText ||
                  latestArticle.Title
                }
                width={300}
                height={200}
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            </div>
          </Link>
        </div>
        <div className="w-full md:w-3/5 flex flex-col justify-start p-2 md:p-4">
          <CardHeader>
            <div className="space-y-1.5">
              {latestArticle.categories &&
                latestArticle.categories.length > 0 && (
                  <div className="flex space-x-2">
                    {latestArticle.categories.map((category) => (
                      <Badge
                        key={category.id}
                        variant="outline"
                        className="bg-primary/10 hover:bg-primary/20 text-primary px-2.5 py-0.5 font-medium"
                      >
                        {category.Name}
                      </Badge>
                    ))}
                  </div>
                )}
              <Link href={`/post/${latestArticle.Slug}`}>
                <CardTitle className="text-xl sm:text-2xl font-bold mt-2 hover:text-primary transition-colors">
                  {latestArticle.Title}
                </CardTitle>
                <CardDescription className="mt-2 line-clamp-3 text-sm sm:text-base text-muted-foreground">
                  {latestArticle.Summary}
                </CardDescription>
                <div className="flex items-center justify-between text-sm text-muted-foreground space-x-4 mt-4">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    <span>{formatDateTime(latestArticle.publishedAt)}</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="mr-1 h-3 w-3" />
                    <span>
                      {calculateReadTime(latestArticle.Content)} min read
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </CardHeader>

          <CardFooter className="flex flex-col space-y-4 pb-6">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarImage
                    src={getStrapiMedia(latestArticle.author.Avatar?.url) || ""}
                    alt={latestArticle.author.Name}
                  />
                  <AvatarFallback>{latestArticle.author.Name}</AvatarFallback>
                </Avatar>
                <div className="text-sm font-medium">
                  {latestArticle.author.Name}
                </div>
              </div>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
