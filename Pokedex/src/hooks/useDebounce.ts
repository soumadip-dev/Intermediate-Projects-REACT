import { useState, useEffect } from 'react';
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // CleanUp: Cancel the timer if the value or delay changes
    return () => clearInterval(handler);
  }, [value, delay]);
  return debouncedValue;
};
export default useDebounce;
