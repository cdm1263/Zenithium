import { useEffect, useState } from "react";

// Note: 검색어용 디바운스 훅, useDeferredValue로 대체되어 더이상 사용하지 않음
const useDebounce = (search: string, delay: number) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedSearch(search);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [search]);

  return { debouncedSearch };
};

export default useDebounce;
