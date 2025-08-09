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
import SeriesAccordion from "@/components/SeriesAccordion";

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
    dirName,
    frontMatter: { title, description, date, updated, image, tags },
  } = post;

  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(
    title
  )}&description=${encodeURIComponent(description)}${
    image ? `&bg=${encodeURIComponent(dirName)}` : ""
  }`;

  return {
    title,
    description,
    authors: { name: "Dongmin" },
    keywords: tags,
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
  const beforePost = getNeighborPost(postIndex + 1);
  const afterPost = getNeighborPost(postIndex - 1);

  const {
    slug,
    content,
    dirName,
    frontMatter: { title, description, image, date, updated, series },
  } = post;

  const allSameSeries = allPosts.filter(
    (post) => post.frontMatter.series === series
  );

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
      image ? `&bg=${encodeURIComponent(dirName)}` : ""
    }`,
    url: `${baseUrl}/blog/${slug}`,
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
        views
      />
      <Inner className="flex flex-col 2xl:max-w-screen-2xl">
        <div className="flex justify-center gap-5">
          <div className="hidden w-56 2xl:block shrink-0">
            {/* // Todo: 추후 공간 활용 */}
          </div>
          <article className="prose dark:prose-invert w-full max-w-screen-lg">
            <CustomMDX source={post.content} />
          </article>
          <TOC toc={toc} />
        </div>
        <Seperator className="border-t m-20 lg:mt-[120px] mb-10 w-full max-w-screen-sm lg:max-w-none xl:max-w-screen-sm self-center" />
        <NeighborPosts beforePost={beforePost} afterPost={afterPost} />
        <SeriesAccordion
          allSameSeries={allSameSeries}
          thisSeries={series}
          thisSlug={slug}
        />

        <Giscus />
      </Inner>
    </section>
  );
};

export default Blog;
