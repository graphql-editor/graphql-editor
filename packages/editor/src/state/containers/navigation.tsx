import { createContainer } from 'unstated-next';
import { useRouter } from '@/state/containers/router';
const useNavigationStateContainer = createContainer(() => {
  const { get, set } = useRouter();
  return {
    menuState: {
      pane: get('pane') || 'diagram',
      code: get('code') || 'on',
    },
    setMenuState: set,
  };
});

export const useNavigationState = useNavigationStateContainer.useContainer;
export const NavigationStateProvider = useNavigationStateContainer.Provider;
