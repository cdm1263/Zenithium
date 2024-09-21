import Link from "next/link";
import Inner from "./Inner";
import { Switch } from "./ui/switch";

const Nav = () => {
  return (
    <nav className="sticky top-0 inset-x-0 w-full h-14 md:h-16  backdrop-blur-md">
      <Inner>
        <div className="flex justify-between items-center h-full">
          <Link href="/" className="flex font-semibold text-xl">
            ZENITH<span className="text-primary">IUM</span>
          </Link>

          <div className="flex h-full items-center space-x-4">
            <Link
              href="/blog"
              className="flex font-semibold hover:text-primary/80 transition-all"
            >
              Blog
            </Link>
            <Link
              href="/resume"
              className="flex font-semibold hover:text-primary/80 transition-all"
            >
              Resume
            </Link>
            <Switch />
          </div>
        </div>
      </Inner>
    </nav>
  );
};

export default Nav;
