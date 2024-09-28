import Link from "next/link";
import Seperator from "./Seperator";
import { FrontMatter, Mdx } from "@/lib/types";
import PostDateAndReadingTime from "./PostDateAndReadingTime";

type Props = {
  posts: Mdx[];
  postsLength?: boolean;
};

const PostCard = ({
  frontMatter,
  content,
  slug,
}: {
  frontMatter: FrontMatter;
  content: string;
  slug: string;
}) => {
  const { series, title, description, date, tags } = frontMatter;
  return (
    <div className="flex flex-col sm:flex-row py-4 gap-5 w-full">
      <Link
        scroll
        href={`/blog/${slug}`}
        className="min-w-[200px] min-h-[200px] border-2 rounded-lg flex justify-center items-center mb-2"
      >
        이미지
      </Link>
      <div className="flex flex-col">
        <Link
          href={`/blog/?series=${series}`}
          className="text-sm hover:underline text-muted-foreground font-semibold mb-3 w-fit"
        >
          {series}
        </Link>
        <Link scroll href={`/blog/${slug}`} className="group">
          <p className="text-2xl font-bold group-hover:text-primary/90 transition-colors duration-200">
            {title}
          </p>
          <p className="text-lg text-muted-foreground group-hover:underline font-semibold mb-3">
            {description}
          </p>
        </Link>
        <div className="flex gap-2 mb-3 flex-wrap">
          {tags.map((tag) => (
            <Link
              href={`/blog?tag=${tag}`}
              key={tag}
              className="text-primary text-sm hover:underline font-semibold"
            >
              #{tag}
            </Link>
          ))}
        </div>
        <PostDateAndReadingTime date={date} content={content} />
      </div>
    </div>
  );
};

const PostLists = ({ posts, postsLength = true }: Props) => {
  return (
    <ul className="flex flex-col w-full gap-3">
      {postsLength ? (
        <p className="text-sm text-muted-foreground">
          <span className="text-primary text-lg font-semibold">
            {posts.length}
          </span>
          개의 포스트가 있습니다
        </p>
      ) : null}
      {posts.map((post, index) => (
        <li key={post.slug} className="flex flex-col">
          {index ? <Seperator className="w-full border-t mb-3" /> : null}
          <PostCard
            slug={post.slug}
            frontMatter={post.frontMatter}
            content={post.content}
          />
        </li>
      ))}
    </ul>
  );
};

export default PostLists;
