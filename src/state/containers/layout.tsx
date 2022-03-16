import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { sizeSidebar, menuWidth } from '@/vars';

const useLayoutStateContainer = createContainer(() => {
  const [sidebarSize, setSidebarSize] = useState<string | number>(sizeSidebar);
  const [windowWidth, setWindowWidth] = useState(0);
  const [documentationWidth, setDocumentationWidth] = useState(300);

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateWindowDimensions);

    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);

  const calcWidth = () => windowWidth - documentationWidth - menuWidth;

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
