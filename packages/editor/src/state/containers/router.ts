import { ActivePane } from '@/editor/menu/Menu';
import { useMemo, useState } from 'react';

const defaultValues = {
  pane: 'diagram' as ActivePane,
  code: 'on' as 'on' | 'off',
  n: '',
};

export const useRouter = () => {
  const [path, setPath] = useState('');
  const set = (props: Partial<typeof defaultValues>) => {
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
  const routes = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(
      Object.entries(defaultValues).map(([k, v]) => [k, params.get(k) || v]),
    );
  }, [window.location.search, path]) as unknown as typeof defaultValues;
  return {
    set,
    routes,
  };
};
