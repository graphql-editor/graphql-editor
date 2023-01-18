import { AllTypes, ParserField, TypeDefinition } from 'graphql-js-tree';
import { useEffect, useMemo, useState } from 'react';

export const toggleableTypes: AllTypes[] = [
  TypeDefinition.ObjectTypeDefinition,
  TypeDefinition.UnionTypeDefinition,
  TypeDefinition.InterfaceTypeDefinition,
];

export const useFilteredNodes = (allNodes: { nodes: ParserField[] }) => {
  const relationNodes = useMemo(
    () => allNodes.nodes.filter((n) => toggleableTypes.includes(n.data.type)),
    [allNodes],
  );

  const [nodesVisibilityArr, setNodesVisibilityArr] = useState(
    relationNodes.map((el) => ({ id: el.id, isHidden: false })),
  );

  useEffect(() => {
    setNodesVisibilityArr((prev) => {
      const newArray = relationNodes.map((el) => {
        const foundElement = prev.find((el2) => el.id === el2.id);
        return { id: el.id, isHidden: foundElement?.isHidden || false };
      });
      return newArray;
    });
  }, [allNodes]);

  const filteredRelationNodes = useMemo(() => {
    return relationNodes.filter((el) => {
      const foundNode = nodesVisibilityArr.find((el2) => el2.id === el.id);
      return foundNode ? !foundNode.isHidden : true;
    });
  }, [nodesVisibilityArr]);

  const hideRelationNodes = () =>
    setNodesVisibilityArr((prev) =>
      prev.map((el) => ({ id: el.id, isHidden: true })),
    );
  const showRelationNodes = () =>
    setNodesVisibilityArr((prev) =>
      prev.map((el) => ({ id: el.id, isHidden: false })),
    );

  const toggleNodeVisibility = (node: ParserField) => {
    const newArr = [...nodesVisibilityArr];
    const foundIdx = newArr.findIndex((el) => el.id === node.id);
    newArr[foundIdx].isHidden = !newArr[foundIdx].isHidden;
    setNodesVisibilityArr(newArr);
  };

  return {
    filteredRelationNodes,
    nodesVisibilityArr,
    hideRelationNodes,
    showRelationNodes,
    toggleNodeVisibility,
  };
};
