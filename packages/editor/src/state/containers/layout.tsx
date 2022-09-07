import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { sizeSidebar, menuWidth } from '@/vars';
import { useNavigationState } from '@/state/containers';
import { AllTypes } from 'graphql-js-tree';

type DragOverStylesDiagram = {
  nodeName: string;
  nodeType?: string;
};

const useLayoutStateContainer = createContainer(() => {
  const [sidebarSize, setSidebarSize] = useState(sizeSidebar);
  const [windowWidth, setWindowWidth] = useState(0);
  const [documentationWidth, setDocumentationWidth] = useState(300);
  const [dragOverStylesDiagram, setDragOverStylesDiagram] =
    useState<DragOverStylesDiagram>();
  const [dndType, setDndType] = useState<AllTypes | undefined>();
  const [isOrderListVisible, setIsOrderListVisible] = useState(false);

  const { menuState } = useNavigationState();

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowWidth(window.innerWidth);
    };
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);

  const calcDocumentationWidth = () =>
    windowWidth -
    documentationWidth -
    menuWidth -
    (menuState.code === 'on' ? sidebarSize : 0);

  return {
    windowWidth,
    sidebarSize,
    setSidebarSize,
    documentationWidth,
    setDocumentationWidth,
    calcDocumentationWidth,
    dragOverStylesDiagram,
    setDragOverStylesDiagram,
    dndType,
    setDndType,
    isOrderListVisible,
    setIsOrderListVisible,
  };
});

export const useLayoutState = useLayoutStateContainer.useContainer;
export const LayoutStateProvider = useLayoutStateContainer.Provider;
