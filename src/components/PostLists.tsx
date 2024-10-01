import Link from "next/link";
import Seperator from "./Seperator";
import { FrontMatter, Mdx } from "@/lib/types";
import PostDateAndReadingTime from "./PostDateAndReadingTime";
import NextImage from "next/image";
import { ChartColumnStacked } from "lucide-react";

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
  const { series, title, description, date, tags, image, updated } =
    frontMatter;

  const renderNeworUpdated = () => {
    if (
      (new Date().getTime() - new Date(date).getTime()) /
        (1000 * 60 * 60 * 24) <=
      7
    ) {
      return (
        <div className="text-sm font-bold text-yellow-500 order-1 xs:order-2">
          New
        </div>
      );
    } else if (
      updated &&
      (new Date().getTime() - new Date(updated).getTime()) /
        (1000 * 60 * 60 * 24) <=
        7
    ) {
      return (
        <div className="text-sm font-bold text-green-500 order-1 xs:order-2">
          Update
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center py-4 gap-5 w-full">
      <Link
        scroll
        href={`/blog/${slug}`}
        className="min-w-60 min-h-[200px] relative border-2 rounded-lg flex justify-center items-center mb-2 overflow-hidden group"
      >
        {image ? (
          <NextImage
            src={image}
            alt={title}
            fill
            className="object-cover hover:scale-110 transition-transform duration-500"
          />
        ) : (
          "이미지"
        )}
      </Link>
      <div className="flex flex-col">
        <Link
          href={`/blog/?series=${series}`}
          className="text-sm flex gap-x-1 items-center hover:underline decoration-dashed text-muted-foreground font-semibold mb-3 w-fit"
        >
          <ChartColumnStacked className="h-4 w-4" />
          {series}
        </Link>
        <Link scroll href={`/blog/${slug}`} className="group">
          <div className="flex gap-2 flex-col xs:flex-row xs:items-center">
            <span className="order-2 xs:order-1 text-2xl font-bold group-hover:text-primary/90 transition-colors duration-200">
              {title}
            </span>
            {renderNeworUpdated()}
          </div>
          <p
            className="text-lg text-muted-foreground group-hover:underline 
          underline-offset-[5px] decoration-dashed font-semibold mb-3"
          >
            {description}
          </p>
        </Link>
        <div className="flex gap-2 mb-3 flex-wrap">
          {tags.map((tag) => (
            <Link
              href={`/blog?tag=${tag}`}
              key={tag}
              className="text-primary text-sm hover:underline decoration-dashed font-semibold"
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
