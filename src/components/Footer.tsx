import { Rss } from "lucide-react";
import Inner from "./Inner";
import Github from "/public/icons/github.svg";
import SVGtoComponent from "./SVGtoComponent";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Footer = () => {
  const iconStyle = "h-7 w-7 text-foreground hover:text-primary transition-all";

  return (
    <footer className="bg-muted h-60">
      <Inner className="flex flex-col justify-center items-center">
        <div className="flex gap-x-5 mb-10">
          {/* // TODO: 추후 Link로 변경해야함 */}
          <Link href="/api/rss">
            <Rss className={iconStyle} />
          </Link>
          <Link target="_blank" href="https://github.com/cdm1263">
            <SVGtoComponent
              SVG={Github}
              className={cn(iconStyle, "fill-foreground hover:fill-primary")}
            />
          </Link>
        </div>
        <p className="text-lg text-muted-foreground">
          &copy; {new Date().getFullYear()}, All rights reserved.
        </p>
      </Inner>
    </footer>
  );
};

export default Footer;
