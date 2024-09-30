import { notFound } from "next/navigation";
import { getAllPosts } from "../utils";
import Inner from "@/components/Inner";
import CustomMDX from "@/components/CustomMDX";
import TOC from "@/components/TOC";
import { parseTOCHeadings } from "@/lib/utils";
import CoverImage from "@/components/CoverImage";
import Giscus from "@/components/Giscus";
import Seperator from "@/components/Seperator";
import NeighborPosts from "@/components/NeighborPosts";
import { Metadata } from "next";
import { baseUrl } from "@/app/sitemap";

type Props = { params: { slug: string } };

export const generateStaticParams = async () => {
  const posts = getAllPosts();

  if (!posts) return [];

  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export const generateMetadata = ({ params }: Props): Metadata | undefined => {
  const posts = getAllPosts();
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) return;

  const {
    frontMatter: { title, description, date, updated, image, tags },
  } = post;

  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(
    title
  )}&description=${encodeURIComponent(description)}${
    image ? `&bg=${baseUrl + encodeURIComponent(image)}` : ""
  }`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: date,
      ...(updated && { modifiedTime: updated }),
      authors: ["Dongmin"],
      tags: tags,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    other: {
      "article:published_time": date,
      ...(updated && {
        "article:modified_time": updated,
      }),
    },
  };
};

const Blog = async ({ params }: Props) => {
  const allPosts = getAllPosts();
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const getNeighborPost = (index: number) =>
    allPosts[index]
      ? { slug: allPosts[index].slug, title: allPosts[index].frontMatter.title }
      : null;

  const postIndex = allPosts.findIndex((post) => post.slug === params.slug);
  const beforePost = getNeighborPost(postIndex - 1);
  const afterPost = getNeighborPost(postIndex + 1);

  const {
    slug,
    content,
    frontMatter: { title, description, image, date, updated },
  } = post;

  const toc = await parseTOCHeadings(content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}`,
    },
    headline: title,
    description: description,
    image: `${baseUrl}/api/og?title=${encodeURIComponent(
      title
    )}&description=${encodeURIComponent(description)}${
      image ? `&bg=${baseUrl + encodeURIComponent(image)}` : ""
    }`,
    url: `${baseUrl}/blug/${slug}`,
    datePublished: date,
    dateModified: updated ?? date,
    author: {
      "@type": "Person",
      name: "Dongmin",
    },
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CoverImage
        slug={params.slug}
        frontMatter={post.frontMatter}
        content={post.content}
      />
      <Inner className="flex flex-col">
        <div className="flex justify-center gap-5">
          <div className="hidden w-56 xl:block shrink-0">
            {/* // Todo: 추후 공간 활용 */}
          </div>
          <article className="prose dark:prose-invert px-2 w-full">
            <CustomMDX source={post.content} />
          </article>
          <TOC toc={toc} />
        </div>
        <Seperator className="border-t m-20 lg:mt-[120px] mb-10 w-full max-w-screen-sm lg:max-w-none xl:max-w-screen-sm self-center" />
        <NeighborPosts beforePost={beforePost} afterPost={afterPost} />
        <Giscus />
      </Inner>
    </section>
  );
};

export default Blog;
