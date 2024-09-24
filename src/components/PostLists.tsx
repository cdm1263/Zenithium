import { FrontMatter, Mdx } from "@/app/blog/utils";
import { formatDate } from "@/lib/utils";
import { CalendarDays, Clock } from "lucide-react";
import Link from "next/link";
import readingTime from "reading-time";
import Seperator from "./Seperator";

type Props = {
  posts: Mdx[];
  postsLength?: boolean;
};

const PostCard = ({
  frontMatter,
  timeToRead,
  slug,
}: {
  frontMatter: FrontMatter;
  timeToRead: number;
  slug: string;
}) => {
  const { series, title, description, date, tags } = frontMatter;
  return (
    <div className="flex py-4 gap-5 w-full">
      <Link
        href={`/blog/${slug}`}
        className="min-w-[200px] border-2 rounded-lg flex justify-center items-center"
      >
        이미지
      </Link>
      <div className="flex flex-col">
        <Link
          href={`/blog/?series=${series}`}
          className="text-sm hover:underline text-muted-foreground font-semibold"
        >
          {series}
        </Link>
        <Link href={`/blog/${slug}`} className="group">
          <p className="text-2xl font-bold group-hover:text-primary/90 transition-colors duration-200">
            {title}
          </p>
          <p className="text-lg text-muted-foreground group-hover:underline font-semibold mb-1">
            {description}
          </p>
        </Link>
        <div className="flex gap-2 mb-2">
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
        <div className="flex gap-x-4 text-sm text-muted-foreground">
          <p className="flex gap-1 items-center">
            <CalendarDays className="w-4 h-4" />
            {formatDate(date)}
          </p>
          <p className="flex gap-1 items-center">
            <Clock className="w-4 h-4" />
            평균 {timeToRead}분 소요
          </p>
        </div>
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
            timeToRead={Math.ceil(readingTime(post.content).minutes)}
          />
        </li>
      ))}
    </ul>
  );
};

export default PostLists;
