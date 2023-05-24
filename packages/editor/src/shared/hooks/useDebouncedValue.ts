import { useEffect, useRef, useState } from "react";

export const useDebouncedValue = <T>(value: T, delay = 250) => {
  const timeoutRef = useRef<number | NodeJS.Timeout>();
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setDebouncedValue(value), delay);
  }, [value]);

  return debouncedValue;
};
