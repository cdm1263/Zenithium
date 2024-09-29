import { Rss } from "lucide-react";
import Inner from "./Inner";
import Github from "/public/github.svg";
import SVGtoComponent from "./SVGtoComponent";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Footer = () => {
  const iconStyle =
    "h-7 w-7 text-foreground hover:text-muted-foreground transition-all cursor-pointer";

  return (
    <footer className="bg-muted h-60">
      <Inner className="flex flex-col justify-center items-center">
        <Link href="/api/rss" className="flex gap-x-5 mb-10">
          {/* // TODO: 추후 Link로 변경해야함 */}
          <Rss className={iconStyle} />
          <SVGtoComponent
            SVG={Github}
            className={cn(
              iconStyle,
              "fill-foreground hover:fill-muted-foreground"
            )}
          />
        </Link>
        <p className="text-lg text-muted-foreground">
          &copy; {new Date().getFullYear()}, All rights reserved.
        </p>
      </Inner>
    </footer>
  );
};

export default Footer;
