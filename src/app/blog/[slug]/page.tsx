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

type Props = { params: { slug: string } };

export const generateStaticParams = async () => {
  const posts = getAllPosts();

  if (!posts) return [];

  return posts.map((post) => ({
    slug: post.slug,
  }));
};

// TODO: 동적 메타데이터 관리 필요

// export const generateMetadata = ({ params }) => {
//   const posts = getAllPosts();
//   if (!posts) return;

// };

const Blog = async ({ params }: Props) => {
  const allPosts = getAllPosts();
  const post = allPosts.find((post) => post.slug === params.slug);

  const getNeighborPost = (index: number) =>
    allPosts[index]
      ? { slug: allPosts[index].slug, title: allPosts[index].frontMatter.title }
      : null;

  const postIndex = allPosts.findIndex((post) => post.slug === params.slug);
  const beforePost = getNeighborPost(postIndex - 1);
  const afterPost = getNeighborPost(postIndex + 1);

  if (!post) {
    notFound();
  }

  const toc = await parseTOCHeadings(post.content);

  return (
    <>
      <section>
        <CoverImage
          slug={params.slug}
          frontMatter={post.frontMatter}
          content={post.content}
        />
        <Inner className="flex flex-col">
          {/* // TODO: JSON LD 관리 필요 */}
          {/* <script></script> */}

          {/* // TODO: 게시글 소개 및 제목 영역 추가 */}
          {/* <div>제목 영역</div> */}

          <div className="flex justify-center gap-5">
            <div className="hidden w-56 xl:block shrink-0">
              {/* // Todo: 추후 공간 활용 */}
            </div>
            <article className="prose dark:prose-invert px-2 w-full">
              <CustomMDX source={post.content} />
            </article>
            <TOC toc={toc} />
          </div>
          <Seperator className="border-t mt-20 mb-10 w-full max-w-screen-sm self-center" />
          <NeighborPosts beforePost={beforePost} afterPost={afterPost} />
          <Giscus />
        </Inner>
      </section>
    </>
  );
};

export default Blog;
