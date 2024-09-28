import Link from "next/link";

type Props = {
  beforePost: { slug: string; title: string } | null;
  afterPost: { slug: string; title: string } | null;
};

const NeighborPosts = ({ beforePost, afterPost }: Props) => {
  return (
    <div className="max-w-screen-sm self-center w-full flex mb-10 min-h-20 items-center justify-between">
      {beforePost ? (
        <Link
          className="flex flex-col gap-2 max-w-[40%] min-w-[100px] group"
          href={`/blog/${beforePost.slug}`}
        >
          <span className="text-sm text-muted-foreground/70 group-hover:text-muted-foreground/100 transition-colors">
            이전 포스트
          </span>
          <span className="text-primary/70 group-hover:text-primary/100 transition-colors">
            {beforePost.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {afterPost && (
        <Link
          className="flex flex-col gap-2 max-w-[40%] min-w-[100px] items-end group"
          href={`/blog/${afterPost.slug}`}
        >
          <span className="text-sm text-muted-foreground/70 group-hover:text-muted-foreground/100 transition-colors">
            다음 포스트
          </span>
          <span className="text-primary/70 group-hover:text-primary/100 transition-colors">
            {afterPost.title}
          </span>
        </Link>
      )}
    </div>
  );
};

export default NeighborPosts;
