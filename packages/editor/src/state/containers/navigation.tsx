import { createContainer } from 'unstated-next';
import { useRouter } from '@/state/containers/router';
const useNavigationStateContainer = createContainer(() => {
  const { routes, set } = useRouter();
  return {
    menuState: {
      pane: routes.pane || 'diagram',
      code: routes.code || 'on',
    },
    setMenuState: set,
  };
});

export const useNavigationState = useNavigationStateContainer.useContainer;
export const NavigationStateProvider = useNavigationStateContainer.Provider;
