"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { HTMLAttributes } from "react";

type TagEvent = string | ((tagName: string) => void);

type Props = HTMLAttributes<HTMLSpanElement> & {
  tagName: string;
  className?: string;
  tagEvent: TagEvent;
};

const TagSelector = ({ tagName, className, tagEvent, ...props }: Props) => {
  const router = useRouter();
  const tagHandler = () =>
    typeof tagEvent === "string" ? router.push(tagEvent) : tagEvent(tagName);

  return (
    <span
      onClick={tagHandler}
      onKeyDown={(e) => e.key === "Enter" && tagHandler()}
      tabIndex={0}
      role="button"
      aria-label={`${tagName} 태그 선택`}
      key={tagName}
      className={cn(
        "px-3 py-1 rounded-full text-sm text-primary shrink-0 cursor-pointer border-muted border-2 hover:bg-primary/30 transition-colors select-none",
        className
      )}
      {...props}
    >
      #{tagName}
    </span>
  );
};

export default TagSelector;
