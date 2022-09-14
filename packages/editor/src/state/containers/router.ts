import { ActivePane } from '@/editor/menu/Menu';
import { useEffect, useMemo, useState } from 'react';
import { createContainer } from 'unstated-next';

const defaultValues = {
  pane: 'diagram' as ActivePane,
  code: 'on' as 'on' | 'off',
  n: '',
};

export type EditorRoutes = typeof defaultValues;

export const useRouterContainer = createContainer(() => {
  const [path, setPath] = useState(window.location.search);

  useEffect(() => {
    const listener = (e: PopStateEvent) => {
      const u = new URL(window.location.href);
      setPath(u.searchParams.toString());
    };
    window.addEventListener('popstate', listener);
    return () => window.removeEventListener('popstate', listener);
  }, []);

  const set = (props: Partial<typeof defaultValues>) => {
    const u = new URL(window.location.href);
    Object.entries(props).forEach(([k, v]) => {
      if (!v) {
        u.searchParams.delete(k);
      } else {
        u.searchParams.set(k, v);
      }
    });
    window.history.pushState({}, '', u);
    setPath(u.searchParams.toString());
  };

  const routes = useMemo(() => {
    const params = new URLSearchParams(path);
    return Object.fromEntries(
      Object.entries(defaultValues).map(([k, v]) => [k, params.get(k) || v]),
    );
  }, [path]) as unknown as typeof defaultValues;

  return {
    set,
    routes,
  };
});
export const useRouter = useRouterContainer.useContainer;
export const RouterProvider = useRouterContainer.Provider;
