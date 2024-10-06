import { cn } from "@/lib/utils";
import Link from "next/link";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLSpanElement> & {
  tagName: string;
  className?: string;
  href: string;
};

const TagSelector = ({ tagName, className, href, ...props }: Props) => {
  return (
    <Link
      href={href}
      key={tagName}
      className={cn(
        "px-3 py-1 rounded-full text-sm text-primary shrink-0 cursor-pointer border-muted border-2 hover:bg-primary/30 transition-colors select-none",
        className
      )}
      {...props}
    >
      #{tagName}
    </Link>
  );
};

export default TagSelector;
