import { ActivePane } from '@/editor/menu/Menu';
import { useState } from 'react';
import { createContainer } from 'unstated-next';

type ValuesType = {
  pane?: ActivePane;
  code: 'on' | 'off';
  n?: string;
  source?: 'internal';
};

const defaultValues: ValuesType = {
  pane: 'diagram',
  code: 'on' as 'on' | 'off',
  source: 'internal',
};

export type EditorRoutes = typeof defaultValues;

export const useRouterContainer = createContainer(() => {
  const [path, setPath] = useState(defaultValues);
  const set = (
    props: Partial<typeof defaultValues>,
    source?: ValuesType['source'],
  ) => {
    setPath((p) => ({ ...p, ...props, source }));
  };

  return {
    set,
    routes: path,
  };
});
export const useRouter = useRouterContainer.useContainer;
export const RouterProvider = useRouterContainer.Provider;
