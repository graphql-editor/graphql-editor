import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { ActivePane } from '@/editor/Menu';
const useNavigationStateContainer = createContainer(() => {
  const [menuState, setMenuState] = useState<ActivePane | undefined>(
    'relation',
  );
  const [toggleCode, setToggleCode] = useState(true);
  return { menuState, setMenuState, toggleCode, setToggleCode };
});

export const useNavigationState = useNavigationStateContainer.useContainer;
export const NavigationStateProvider = useNavigationStateContainer.Provider;
