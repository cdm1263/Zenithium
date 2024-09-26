import { notFound } from "next/navigation";
import { getAllPosts } from "../utils";
import Inner from "@/components/Inner";
import CustomMDX from "@/components/CustomMDX";
import TOC from "@/components/TOC";
import { parseTOCHeadings } from "@/lib/utils";
import ScrollToTop from "@/components/ScrollToTop";

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
  const post = getAllPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const toc = parseTOCHeadings(post.content);

  return (
    <>
      <ScrollToTop />
      <section>
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
          {/* // TODO: 댓글 영역 추가 */}
          {/* <div className="w-full h-screen bg-slate-200/50">댓글 영역</div> */}
        </Inner>
      </section>
    </>
  );
};

export default Blog;
