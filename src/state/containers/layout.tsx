import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { sizeSidebar, menuWidth } from '@/vars';
import { useNavigationState } from '@/state/containers';

const useLayoutStateContainer = createContainer(() => {
  const [sidebarSize, setSidebarSize] = useState(sizeSidebar);
  const [windowWidth, setWindowWidth] = useState(0);
  const [documentationWidth, setDocumentationWidth] = useState(300);

  const { menuState } = useNavigationState();

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowWidth(window.innerWidth);
    };
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);

  const calcWidth = () =>
    windowWidth -
    documentationWidth -
    menuWidth -
    (menuState.code ? sidebarSize : 0);

  return {
    windowWidth,
    sidebarSize,
    setSidebarSize,
    documentationWidth,
    setDocumentationWidth,
    calcWidth,
  };
});

export const useLayoutState = useLayoutStateContainer.useContainer;
export const LayoutStateProvider = useLayoutStateContainer.Provider;
