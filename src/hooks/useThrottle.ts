import { useCallback, useRef } from "react";

const useThrottle = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const lastRun = useRef<number>(Date.now());
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useCallback(
    (...args: T) => {
      const timeElapsed = Date.now() - lastRun.current;
      if (timeElapsed >= delay) {
        callbackRef.current(...args);
        lastRun.current = Date.now();
      }
    },
    [delay]
  );
};

export default useThrottle;
