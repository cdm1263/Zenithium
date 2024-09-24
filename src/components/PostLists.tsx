import { FrontMatter, Mdx } from "@/app/blog/utils";
import { formatDate } from "@/lib/utils";
import { CalendarDays, Clock } from "lucide-react";
import Link from "next/link";
import readingTime from "reading-time";

type Props = {
  posts: Mdx[];
};

const PostCard = ({
  frontMatter,
  timeToRead,
}: {
  frontMatter: FrontMatter;
  timeToRead: number;
}) => {
  const { series, title, description, date, tags } = frontMatter;
  return (
    <div className="px-6 py-4 rounded-lg border-2 hover:bg-primary/5 hover:border-primary/60 transition-colors group">
      <div className="flex w-full justify-between mb-1 ">
        <p className="text-2xl font-bold">{title}</p>
        <p className="text-sm border-2 border-muted-foreground/50 w-fit h-fit px-2 py-0.5 rounded-md shrink-0">
          {series}
        </p>
      </div>
      <p className="text-lg text-muted-foreground font-semibold mb-2 ">
        {description}
      </p>
      <div className="flex gap-2 mb-2">
        {tags.map((tag) => (
          <span key={tag} className="text-primary text-sm">
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex w-full justify-between text-sm text-muted-foreground">
        <p className="flex gap-2 items-center">
          <CalendarDays className="w-4 h-4" />
          {formatDate(date)}
        </p>
        <p className="flex gap-2 items-center">
          <Clock className="w-4 h-4" />
          평균 {timeToRead}분 소요
        </p>
      </div>
    </div>
  );
};

const PostLists = ({ posts }: Props) => {
  return (
    <ul className="flex flex-col w-full gap-3">
      <p className="text-sm text-muted-foreground">
        <span className="text-primary text-lg font-semibold">
          {posts.length}
        </span>
        개의 포스트가 있습니다
      </p>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`blog/${post.slug}`}>
            <PostCard
              frontMatter={post.frontMatter}
              timeToRead={Math.ceil(readingTime(post.content).minutes)}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostLists;
