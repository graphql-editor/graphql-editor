import { ActivePane } from '@/editor/menu/Menu';
import { useState } from 'react';
import { createContainer } from 'unstated-next';

const defaultValues = {
  pane: 'diagram' as ActivePane,
  code: 'on' as 'on' | 'off',
  n: '',
};

export type EditorRoutes = typeof defaultValues;

export const useRouterContainer = createContainer(() => {
  const [path, setPath] = useState(defaultValues);
  const set = (props: Partial<typeof defaultValues>) => {
    setPath((p) => ({ ...p, ...props }));
  };

  return {
    set,
    routes: path,
  };
});
export const useRouter = useRouterContainer.useContainer;
export const RouterProvider = useRouterContainer.Provider;
