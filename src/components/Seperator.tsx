import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

const Seperator = ({ className, ...props }: Props) => {
  return (
    <div className={cn("border-muted-foreground/30", className)} {...props} />
  );
};

export default Seperator;
