import { useTreesState } from '@/state/containers';
import { Diagram as DiagramEngine } from 'graphsource';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { style } from 'typestyle';
import { theme } from './theme';
import { TreeToNodes } from './TreeToNodes';

const Main = style({
  width: '100%',
  position: 'relative',
});

export const Hierarchy = () => {
  const { tree, libraryTree } = useTreesState();
  const [hierarchy, setHierarchy] = useState<DiagramEngine>();

  const diagramRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (diagramRef.current) {
      setDOMElement(diagramRef.current);
    }
  }, []);

  useEffect(() => {
    if (hierarchy && tree && libraryTree) {
      const tr = TreeToNodes.resolveTree({
        nodes: [...tree.nodes, ...libraryTree.nodes],
      });
      console.log(tr);
      hierarchy.setNodes(tr.nodes);
    }
  }, [tree, hierarchy, libraryTree]);

  const setDOMElement = (element: HTMLElement): void => {
    setHierarchy(
      new DiagramEngine(element, {
        theme,
      }),
    );
    // diagram.eventBus.on('NodeSelected', this.onSelectNode);
  };
  return <div className={Main} ref={diagramRef}></div>;
};
