import { baseUrl } from "@/app/sitemap";
import { MetadataRoute } from "next";

type Robots = () => MetadataRoute.Robots;

const robots: Robots = () => {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
};

export default robots;
