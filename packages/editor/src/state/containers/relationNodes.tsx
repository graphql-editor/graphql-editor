import { createContainer } from 'unstated-next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTreesState } from '@/state/containers/trees';
import {
  AllTypes,
  getTypeName,
  ParserField,
  TypeDefinition,
} from 'graphql-js-tree';

export const toggleableTypes: AllTypes[] = [
  TypeDefinition.ObjectTypeDefinition,
  TypeDefinition.UnionTypeDefinition,
  TypeDefinition.InterfaceTypeDefinition,
];

const useRelationNodes = createContainer(() => {
  const { allNodes, setSelectedNodeId } = useTreesState();

  const relationNodes = useMemo(
    () => allNodes.nodes.filter((n) => toggleableTypes.includes(n.data.type)),
    [allNodes],
  );

  const [nodesVisibilityArr, setNodesVisibilityArr] = useState(
    relationNodes.map((el) => ({ id: el.id, isHidden: false })),
  );
  const [nodesBeforeFocusVisibility, setNodesBeforeFocusVisibility] = useState<
    typeof nodesVisibilityArr
  >([]);

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
    setSelectedNodeId(undefined);
  }, []);

  const showRelationNodes = useCallback(
    () =>
      setNodesVisibilityArr((prev) =>
        prev.map((el) => ({ id: el.id, isHidden: false })),
      ),
    [],
  );
  const focusNode = useCallback(
    (n: ParserField) => {
      setNodesBeforeFocusVisibility((nf) =>
        nf.length > 0 ? nf : [...nodesVisibilityArr],
      );
      const types = n.args.map((a) => getTypeName(a.type.fieldType));
      const children = allNodes.nodes.filter((an) => types.includes(an.name));
      const parents = allNodes.nodes.filter((an) =>
        an.args.some((a) => getTypeName(a.type.fieldType) === n.name),
      );
      const visibleIds = children
        .map((c) => c.id)
        .concat(parents.map((p) => p.id))
        .concat([n.id]);
      setNodesVisibilityArr((prev) =>
        prev.map((el) => ({
          id: el.id,
          isHidden: !visibleIds.includes(el.id),
        })),
      );
    },
    [
      allNodes,
      setNodesBeforeFocusVisibility,
      setNodesVisibilityArr,
      nodesVisibilityArr,
    ],
  );
  const deFocusNode = useCallback(() => {
    if (nodesBeforeFocusVisibility.length > 0) {
      setNodesVisibilityArr([...nodesBeforeFocusVisibility]);
      setNodesBeforeFocusVisibility([]);
    }
  }, [
    allNodes,
    nodesBeforeFocusVisibility,
    setNodesVisibilityArr,
    setNodesBeforeFocusVisibility,
  ]);

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
    focusNode,
    deFocusNode,
    isFocused: nodesBeforeFocusVisibility.length > 0,
  };
});

export const useRelationNodesState = useRelationNodes.useContainer;
export const RelationNodesProvider = useRelationNodes.Provider;
