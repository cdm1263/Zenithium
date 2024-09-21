import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

const Inner = ({ className, children }: Props) => {
  return (
    <div
      className={cn(
        "h-full w-full max-w-screen-xl px-3 md:px-20 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Inner;
