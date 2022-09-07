import { ActivePane } from '@/editor/menu/Menu';
import { useMemo, useState } from 'react';

export interface Routes {
  pane?: ActivePane;
  code?: 'on' | 'off';
}

export const useRouter = () => {
  const [path, setPath] = useState('');
  const params = useMemo(
    () => new URLSearchParams(window.location.search),
    [window.location.search, path],
  );
  const set = (props: Routes) => {
    const currentSearchParams = new URLSearchParams(window.location.search);
    Object.entries(props).forEach(([k, v]) => {
      currentSearchParams.set(k, v);
    });
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${currentSearchParams.toString()}`,
    );
    setPath(currentSearchParams.toString());
  };
  return {
    set,
    get: <T extends keyof Routes>(key: T) =>
      params.get(key) as Routes[T] | undefined,
  };
};
