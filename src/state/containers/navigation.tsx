import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { ActivePane } from '@/editor/Menu';
const useNavigationStateContainer = createContainer(() => {
  const [menuState, setMenuState] = useState<{
    pane?: ActivePane;
    code?: boolean;
  }>({
    code: true,
    pane: 'diagram',
  });
  return { menuState, setMenuState };
});

export const useNavigationState = useNavigationStateContainer.useContainer;
export const NavigationStateProvider = useNavigationStateContainer.Provider;
