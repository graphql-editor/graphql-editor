import { useState } from 'react';

export const useThrottledValue = <T>({
  delay = 300,
  initialValue,
}: {
  delay?: number;
  initialValue?: T;
}) => {
  const [liveValue, setLiveValue] = useState<T | undefined>(initialValue);
  const [value, _setValue] = useState<T | undefined>(initialValue);
  const [, setT] = useState<ReturnType<typeof setTimeout>>();
  const setValue = (v: T) => {
    setLiveValue(v);
    setT((oldTimeout) => {
      if (oldTimeout) clearTimeout(oldTimeout);
      return setTimeout(() => _setValue(v), delay);
    });
  };
  return {
    liveValue,
    value,
    setValue,
  };
};
