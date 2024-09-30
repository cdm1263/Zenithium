import { MetadataRoute } from "next";
import { getAllPosts } from "./blog/utils";

// TODO: 배포 이후 baseUrl 변경
export const baseUrl = "http://localhost:3000";

type Sitemap = () => MetadataRoute.Sitemap;

const sitemap: Sitemap = () => {
  const allPosts = getAllPosts();

  const postUrls = allPosts.map(({ slug, frontMatter }) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(frontMatter.updated || frontMatter.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  return [...staticUrls, ...postUrls];
};

export default sitemap;
