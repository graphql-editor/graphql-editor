import { NumberNode } from 'graphql-editor-worker';
import { useDomOperations } from '@/Relation/shared/useDomEvent';
import { useLazyControls } from '@/Relation/shared/useLazyControls';
import { ReactZoomPanPinchState } from 'react-zoom-pan-pinch';

export const useDomManagerTs = (className: string) => {
  const { zoomToElement } = useLazyControls();
  const DOMGraphNode = useDomOperations('graph-node');
  const DOMGraphConnection = useDomOperations('graph-connection');

  const zoomNode = (nodeId: string, largeSimulationLoading?: boolean) => {
    if (!largeSimulationLoading) {
      zoomToElement(`${className}-node-${nodeId}`);
    }
  };
  const selectNode = (nodeId: string, largeSimulationLoading?: boolean) => {
    DOMGraphNode.addClassToAll('selection');
    DOMGraphConnection.addClassToAll('selection');
    DOMGraphConnection.addClassByFn('active', (e) => {
      const svgElem = e as SVGGElement;
      return (
        svgElem.dataset['from'] === nodeId || svgElem.dataset['to'] === nodeId
      );
    });
    DOMGraphNode.addClassByFn('active', (e) => {
      return e.id === `${className}-node-${nodeId}`;
    });
    zoomNode(nodeId, largeSimulationLoading);
  };
  const deselectNodes = () => {
    DOMGraphNode.removeClasses(['active', 'selection', 'related']);
    DOMGraphConnection.removeClasses(['active', 'selection']);
  };
  const markRelated = (relatedNodeIdsToSelected: string[]) => {
    DOMGraphNode.addClassByFn('related', (e) => {
      return relatedNodeIdsToSelected
        .map((r) => `${className}-node-${r}`)
        .includes(e.id);
    });
  };
  const markInViewport = (nodesInViewport: string[]) => {
    const mappedNodes = nodesInViewport.map((r) => `${className}-node-${r}`);
    DOMGraphConnection.toggleClassByFn('inViewport', (e) => {
      const svgElem = e as SVGGElement;
      return !!(
        svgElem.dataset['from'] &&
        nodesInViewport.includes(svgElem.dataset['from']) &&
        svgElem.dataset['to'] &&
        nodesInViewport.includes(svgElem.dataset['to'])
      );
    });
    DOMGraphNode.toggleClassByFn('inViewport', (e) => {
      return mappedNodes.includes(e.id);
    });
  };
  const cullNodes = (
    nodes: NumberNode[],
    state: ReactZoomPanPinchState,
    size: DOMRect,
  ) => {
    const pan = {
      x: state.positionX / state.scale,
      y: state.positionY / state.scale,
      scale: state.scale,
    };
    const viewport = {
      w: size.width / state.scale,
      h: size.height / state.scale,
    };
    const bb = {
      x: [-pan.x, -pan.x + viewport.w],
      y: [-pan.y, -pan.y + viewport.h],
    };
    const activeNodes = nodes
      .filter((node) => {
        const n = {
          ...node,
          x: node.x - node.width / 2.0,
          y: node.y - node.height / 2.0,
        };
        const x =
          (n.x < bb.x[1] && n.x > bb.x[0]) ||
          (n.x + n.width > bb.x[0] && n.x + n.width < bb.x[1]);
        const y =
          (n.y < bb.y[1] && n.y > bb.y[0]) ||
          (n.y + n.height > bb.y[0] && n.y + n.height < bb.y[1]);
        return x && y;
      })
      .map((n) => n.id);
    markInViewport(activeNodes);
  };
  return {
    selectNode,
    deselectNodes,
    markRelated,
    zoomNode,
    cullNodes,
  };
};
