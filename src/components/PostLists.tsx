import { FrontMatter, Mdx } from "@/app/blog/utils";
import Link from "next/link";

type Props = {
  posts: Mdx[];
};

// TODO: 스타일링 필요
const Post = ({ frontMatter }: { frontMatter: FrontMatter }) => {
  const { series, title, description, date } = frontMatter;
  return (
    <div className="rounded-sm border-2">
      <p>{series}</p>
      <p>{title}</p>
      <p>{description}</p>
      <p>{new Date(date).toUTCString()}</p>
    </div>
  );
};

const PostLists = ({ posts }: Props) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`blog/${post.slug}`}>
            <Post frontMatter={post.frontMatter} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostLists;
