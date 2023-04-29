import { useDomOperations } from '@/Relation/shared/useDomEvent';
import { useLazyControls } from '@/Relation/shared/useLazyControls';

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
    DOMGraphNode.leaveWithBaseClass(['active', 'selection', 'related']);
    DOMGraphConnection.leaveWithBaseClass(['active', 'selection']);
  };
  const markRelated = (relatedNodeIdsToSelected: string[]) => {
    DOMGraphNode.addClassByFn('related', (e) => {
      return relatedNodeIdsToSelected
        .map((r) => `${className}-node-${r}`)
        .includes(e.id);
    });
  };
  return {
    selectNode,
    deselectNodes,
    markRelated,
    zoomNode,
  };
};
