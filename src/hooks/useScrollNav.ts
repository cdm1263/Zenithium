import { useEffect, useState } from "react";
import useThrottle from "./useThrottle";

const useScrollNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 1) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  const throttledHandler = useThrottle(handleScroll, 100);

  useEffect(() => {
    window.addEventListener("scroll", throttledHandler);

    return () => window.removeEventListener("scroll", throttledHandler);
  }, []);

  return { isScrolled };
};

export default useScrollNav;
