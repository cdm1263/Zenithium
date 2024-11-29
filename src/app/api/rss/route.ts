import { getAllPosts } from "@/app/blog/utils";
import { baseUrl } from "@/app/sitemap";
import RSS from "rss";

export const GET = () => {
  const allPosts = getAllPosts();

  const feed = new RSS({
    title: "Zenithium",
    description: "To Zenith",
    generator: "RSS for Zenithium",
    site_url: baseUrl,
    feed_url: `${baseUrl}/feed.xml`,
    copyright: `Copyright ${new Date().getUTCFullYear().toString()}`,
    language: "ko-KR",
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  allPosts.forEach(({ frontMatter: { title, description, date }, slug }) => {
    feed.item({
      title,
      description,
      date,
      url: `${baseUrl}/blog/${slug}`,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
