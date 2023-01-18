import { createContainer } from 'unstated-next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTreesState } from '@/state/containers/trees';
import { AllTypes, ParserField, TypeDefinition } from 'graphql-js-tree';

export const toggleableTypes: AllTypes[] = [
  TypeDefinition.ObjectTypeDefinition,
  TypeDefinition.UnionTypeDefinition,
  TypeDefinition.InterfaceTypeDefinition,
];

const useRelationNodes = createContainer(() => {
  const { allNodes, setSelectedNode } = useTreesState();

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

  const hideRelationNodes = useCallback(() => {
    setNodesVisibilityArr((prev) =>
      prev.map((el) => ({ id: el.id, isHidden: true })),
    );
    setSelectedNode(undefined);
  }, []);

  const showRelationNodes = useCallback(
    () =>
      setNodesVisibilityArr((prev) =>
        prev.map((el) => ({ id: el.id, isHidden: false })),
      ),
    [],
  );

  const toggleNodeVisibility = useCallback(
    (node: ParserField) => {
      const newArr = [...nodesVisibilityArr];
      const foundIdx = newArr.findIndex((el) => el.id === node.id);
      newArr[foundIdx].isHidden = !newArr[foundIdx].isHidden;
      setNodesVisibilityArr(newArr);
    },
    [nodesVisibilityArr],
  );

  return {
    filteredRelationNodes,
    nodesVisibilityArr,
    hideRelationNodes,
    showRelationNodes,
    toggleNodeVisibility,
  };
});

export const useRelationNodesState = useRelationNodes.useContainer;
export const RelationNodesProvider = useRelationNodes.Provider;
