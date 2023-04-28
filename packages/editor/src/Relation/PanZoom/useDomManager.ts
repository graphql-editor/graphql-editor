import { useDomOperations } from '@/Relation/shared/useDomEvent';
import { useLazyControls } from '@/Relation/shared/useLazyControls';

export const useDomManagerTs = () => {
  const { zoomToElement } = useLazyControls();
  const DOMGraphNode = useDomOperations('graph-node');
  const DOMGraphConnection = useDomOperations('graph-connection');

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
      return e.id === `node-${nodeId}`;
    });
    if (!largeSimulationLoading) {
      zoomToElement(`node-${nodeId}`);
    }
  };
  const deselectNodes = () => {
    DOMGraphNode.leaveWithBaseClass(['active', 'selection', 'related']);
    DOMGraphConnection.leaveWithBaseClass(['active', 'selection']);
  };
  const markRelated = (relatedNodeIdsToSelected: string[]) => {
    DOMGraphNode.addClassByFn('related', (e) => {
      return relatedNodeIdsToSelected.map((r) => `node-${r}`).includes(e.id);
    });
  };
  return {
    selectNode,
    deselectNodes,
    markRelated,
  };
};
