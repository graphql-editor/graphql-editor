import { useTheme, useTreesState } from '@/state/containers';
import { Diagram as DiagramEngine } from 'graphsource';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { style } from 'typestyle';
import { theme as HierarchyTheme } from './theme';
import { TreeToNodes } from './TreeToNodes';

const Main = style({
  width: '100%',
  position: 'relative',
});

export const Hierarchy = () => {
  const { tree, libraryTree, selectedNode, setSelectedNode } = useTreesState();
  const [hierarchy, setHierarchy] = useState<DiagramEngine>();

  const diagramRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useLayoutEffect(() => {
    if (diagramRef.current) {
      setDOMElement(diagramRef.current);
    }
  }, []);

  useEffect(() => {
    if (hierarchy && selectedNode) {
      hierarchy.eventBus.publish('RequestNodeSelect', {
        fn: (n) => n.name === selectedNode.name,
      });
    }
  }, [selectedNode, hierarchy]);

  useEffect(() => {
    if (hierarchy && tree && libraryTree) {
      const tr = TreeToNodes.resolveTree({
        nodes: [...tree.nodes, ...libraryTree.nodes],
      });
      hierarchy.setNodes(tr.nodes);
      hierarchy.eventBus.subscribe('NodeSelected', (e) => {
        setSelectedNode(
          e.selectedNodes.length > 0
            ? tree.nodes.find((tn) => tn.name === e.selectedNodes[0].name)
            : undefined,
        );
      });
    }
  }, [tree, hierarchy, libraryTree]);

  const setDOMElement = (element: HTMLElement): void => {
    setHierarchy(
      new DiagramEngine(element, {
        theme: HierarchyTheme(theme),
      }),
    );
    // diagram.eventBus.on('NodeSelected', this.onSelectNode);
  };
  return <div className={Main} ref={diagramRef}></div>;
};
