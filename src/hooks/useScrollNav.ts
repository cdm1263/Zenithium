import { useEffect, useState } from "react";
import useThrottle from "./useThrottle";

const useScrollNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrolled = window.scrollY > 50;
    setIsScrolled(scrolled);
  };

  const throttledHandler = useThrottle(handleScroll, 30);

  useEffect(() => {
    window.addEventListener("scroll", throttledHandler);

    handleScroll();

    return () => window.removeEventListener("scroll", throttledHandler);
  }, [throttledHandler]);

  return { isScrolled };
};

export default useScrollNav;
