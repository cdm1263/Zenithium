import { useRef } from "react";

const useThrottle = (callback: (...args: any[]) => void, delay: number) => {
  const lastRun = useRef<number>(Date.now());

  return (...args: any[]) => {
    const timeElapsed = Date.now() - lastRun.current;

    if (timeElapsed >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    }
  };
};

export default useThrottle;
