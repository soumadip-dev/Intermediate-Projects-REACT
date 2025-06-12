import { useRef, useEffect } from 'react';

interface UseDebounceProps {
  callback: () => void;
  delay: number;
  deps?: any[];
}

const useDebounce = ({ callback, delay, deps = [] }: UseDebounceProps) => {
  const handler = useRef<number | null>(null); 

  useEffect(() => {
    if (handler.current) clearTimeout(handler.current);
    handler.current = window.setTimeout(() => {
      callback();
    }, delay); 

    return () => {
      if (handler.current) clearTimeout(handler.current);
    };
  }, [delay, ...deps, callback]);
};

export default useDebounce;
