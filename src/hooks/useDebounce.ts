import { useEffect, useState } from "react";

const useDebounce = (search: string, delay: number) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedSearch(search);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [search, delay]);

  return { debouncedSearch };
};

export default useDebounce;
