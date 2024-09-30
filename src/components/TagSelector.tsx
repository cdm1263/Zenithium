import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLSpanElement> & {
  tagName: string;
  className?: string;
  handler: (tagName: string, ...args: unknown[]) => void;
};

const TagSelector = ({ tagName, className, handler, ...props }: Props) => {
  return (
    <span
      key={tagName}
      className={cn(
        "px-3 py-1 rounded-full text-sm text-primary shrink-0 cursor-pointer border-muted border-2 hover:bg-primary/30 transition-colors select-none",
        className
      )}
      onClick={(...args) => handler(tagName, ...args)}
      {...props}
    >
      #{tagName}
    </span>
  );
};

export default TagSelector;
