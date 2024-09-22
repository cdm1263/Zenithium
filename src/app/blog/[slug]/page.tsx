import { notFound } from "next/navigation";
import { getAllPosts } from "../utils";
import Inner from "@/components/Inner";
import CustomMDX from "@/components/CustomMDX";

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

  return (
    <section>
      <Inner className="flex">
        {/* // TODO: JSON LD 관리 필요 */}
        {/* <script></script> */}

        <div className="hidden w-60 xl:block bg-yellow-200 shrink-0"></div>
        <article className="flex-1 prose">
          <h1>{post.frontMatter.title}</h1>
          <CustomMDX source={post.content} />
        </article>
        <div className="hidden w-60 lg:block bg-yellow-200 shrink-0"></div>
      </Inner>
    </section>
  );
};

export default Blog;
