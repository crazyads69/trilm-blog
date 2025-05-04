import { ArticlesResponse } from "@/interface/article.interface";
import { fetchAPI } from "@/util/strapi.util";
import LatestCardPost from "./LatestCardPost";
import WelcomeBlog from "./WelcomeBlog";
import CardPost from "./CardPost";

async function getLatestArticles() {
  try {
    const response = await fetchAPI<ArticlesResponse>("/articles", {
      fields: ["Title", "Slug", "Summary", "Content", "publishedAt"],
      populate: {
        author: {
          fields: ["Name"],
          populate: {
            Avatar: {
              fields: ["url", "alternativeText", "width", "height"],
            },
          },
        },
        CoverImage: {
          fields: ["url", "alternativeText", "width", "height"],
        },
        categories: {
          fields: ["Name", "Slug"],
        },
        tags: {
          fields: ["Name", "Slug"],
        },
        SEO: {
          fields: ["MetaTitle", "MetaDescription", "MetaKeywords"],
          populate: {
            OpenGraphImage: {
              fields: ["url", "width", "height", "alternativeText"],
            },
          },
        },
      },
      sort: ["publishedAt:desc"],
      pagination: {
        page: 1,
        pageSize: 5,
      },
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching latest articles:", error);
    return [];
  }
}

export default async function RootPage() {
  const latestArticles = await getLatestArticles();

  return (
    <main className="flex flex-col items-center justify-between container mx-auto min-h-screen py-10">
      {latestArticles.length > 0 ? (
        <div className=" w-full items-center flex flex-col justify-center">
          <WelcomeBlog />
          <LatestCardPost
            latestArticle={latestArticles[latestArticles.length - 1]}
          />
          <CardPost
            latestArticles={latestArticles.slice(0, latestArticles.length - 1)}
          />
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <h1 className="text-2xl font-bold">No articles found</h1>
        </div>
      )}
    </main>
  );
}
