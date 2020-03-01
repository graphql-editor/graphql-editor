import { EditorNode } from '../../Models';

export type KeyboardNavDirection = 'ArrowDown' | 'ArrowUp' | 'ArrowRight' | 'ArrowLeft';

export const flattenNodeTree = (nodes: EditorNode[], unfoldedNodeIdList: string[]): EditorNode[] => {
  return nodes.reduce((accumulator: EditorNode[], node: EditorNode) => {
    if (unfoldedNodeIdList.includes(node.id)) {
      return [...accumulator, node, ...flattenNodeTree(node.inputs || [], unfoldedNodeIdList)];
    } else {
      return [...accumulator, node];
    }
  }, []);
};

export const getNextSelectedNode = (
  flatNodeList: EditorNode[],
  direction: KeyboardNavDirection,
  selectedNode?: EditorNode,
): EditorNode | null => {
  if (direction === 'ArrowRight') {
    if (selectedNode && selectedNode.inputs && selectedNode.inputs.length > 0) {
      return selectedNode.inputs[0];
    }
    return null;
  }
  if (direction === 'ArrowLeft') {
    if (selectedNode && selectedNode.outputs && selectedNode.outputs.length > 0) {
      return selectedNode.outputs[0];
    }
    return null;
  }

  const fallbackSelectedNode = flatNodeList[direction === 'ArrowDown' ? 0 : flatNodeList.length - 1];

  if (!selectedNode) {
    return fallbackSelectedNode;
  }

  const currentLevelNodeIndex = flatNodeList.findIndex((n) => n.id === selectedNode.id);
  if (currentLevelNodeIndex > -1) {
    return flatNodeList[currentLevelNodeIndex + (direction === 'ArrowDown' ? 1 : -1)] || fallbackSelectedNode;
  }

  return fallbackSelectedNode;
};

export const getQueryMatchingNodeTree = (node: EditorNode, phrase: string): Boolean => {
  return (
    Boolean(node.name.toLowerCase().match(phrase.toLowerCase())) ||
    Boolean(node.inputs?.some((nodeInput) => getQueryMatchingNodeTree(nodeInput, phrase)))
  );
};

export const getSearchExpandTree = (node: EditorNode, phrase: string): EditorNode | null => {
  const currentNodeMatches = Boolean(node.name.toLowerCase().match(phrase.toLowerCase()));
  const matchingInputs = node.inputs
    ?.map((nodeInput) => getSearchExpandTree(nodeInput, phrase))
    .filter((n) => n !== null) as EditorNode[];

  if (matchingInputs) {
    return currentNodeMatches || matchingInputs.length ? { ...node, inputs: matchingInputs || [] } : null;
  } else {
    return currentNodeMatches ? node : null;
  }
};

export const getSelectedExpandTree = (node: EditorNode, selectedNodes: EditorNode[]): EditorNode | null => {
  const currentNodeMatches = selectedNodes.map((sn) => sn.id).includes(node.id);

  const matchingInputs = node.inputs
    ?.map((nodeInput) => getSelectedExpandTree(nodeInput, selectedNodes))
    .filter((n) => n !== null) as EditorNode[];

  if (matchingInputs) {
    return currentNodeMatches || matchingInputs.length ? { ...node, inputs: matchingInputs || [] } : null;
  } else {
    return currentNodeMatches ? node : null;
  }
};

export const scrollToSelectedNode = (selectedElement?: HTMLDivElement) => {
  if (!selectedElement) {
    return;
  }

  const containerElement = selectedElement.parentNode as HTMLDivElement;

  if (!selectedElement) {
    return;
  }

  if (
    selectedElement.offsetTop >=
    containerElement.offsetHeight + containerElement.scrollTop - selectedElement.offsetHeight
  ) {
    containerElement.scrollTop =
      selectedElement.offsetTop - containerElement.offsetHeight + 2 * selectedElement.offsetHeight;
  }

  if (containerElement.scrollTop >= selectedElement.offsetTop - containerElement.offsetTop) {
    containerElement.scrollTop = selectedElement.offsetTop - containerElement.offsetTop - selectedElement.offsetHeight;
  }
};
