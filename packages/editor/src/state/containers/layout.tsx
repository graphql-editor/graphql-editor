import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { sizeSidebar } from "@/vars";
import { AllTypes } from "graphql-js-tree";

type DragOverStylesDiagram = {
  nodeName: string;
  nodeType?: string;
  isPaddingLeft: boolean;
};

const useLayoutStateContainer = createContainer(() => {
  const [sidebarSize, setSidebarSize] = useState(sizeSidebar);
  const [windowWidth, setWindowWidth] = useState(0);
  const [dragOverStylesDiagram, setDragOverStylesDiagram] =
    useState<DragOverStylesDiagram>();
  const [dndType, setDndType] = useState<AllTypes | undefined>();
  const [startDragIdx, setStartDragIdx] = useState<number>();

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowWidth(window.innerWidth);
    };
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  return {
    windowWidth,
    sidebarSize,
    setSidebarSize,
    dragOverStylesDiagram,
    setDragOverStylesDiagram,
    dndType,
    setDndType,
    startDragIdx,
    setStartDragIdx,
  };
});

export const useLayoutState = useLayoutStateContainer.useContainer;
export const LayoutStateProvider = useLayoutStateContainer.Provider;
