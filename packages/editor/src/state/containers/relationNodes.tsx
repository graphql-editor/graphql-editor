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
  TypeDefinition.InputObjectTypeDefinition,
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
  const [focusMode, setFocusMode] = useState<string>();

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

  const focusedNodes = useMemo(() => {
    const nId = focusMode;
    if (nId) {
      const n = allNodes.nodes.find((an) => an.id === nId);
      if (n) {
        const types = n.args.map((a) => getTypeName(a.type.fieldType));
        const argChild = n.args
          .flatMap((a) => a.args)
          .map((ca) => getTypeName(ca.type.fieldType));
        const argChildren = allNodes.nodes.filter((an) =>
          argChild.includes(an.name),
        );
        const children = allNodes.nodes.filter((an) => types.includes(an.name));
        const parents = allNodes.nodes.filter((an) =>
          an.args.some((a) => getTypeName(a.type.fieldType) === n.name),
        );
        const relatedFocusNodes = [...children, ...parents, ...argChildren, n];
        return relatedFocusNodes
          .filter(
            (n, i) =>
              i === relatedFocusNodes.findIndex((rfn) => rfn.id === n.id),
          )
          .filter((n) => toggleableTypes.includes(n.data.type));
      }
    }
    return;
  }, [focusMode]);

  const focusNode = useCallback((n: ParserField) => {
    setSelectedNodeId({
      source: 'deFocus',
      value: {
        id: n.id,
        name: n.name,
      },
    });
    setFocusMode(n.id);
  }, []);
  const toggleNodeVisibility = useCallback(
    (node: ParserField) => {
      const newArr = [...nodesVisibilityArr];
      const foundIdx = newArr.findIndex((el) => el.id === node.id);
      newArr[foundIdx].isHidden = !newArr[foundIdx].isHidden;
      setNodesVisibilityArr(newArr);
    },
    [nodesVisibilityArr],
  );

  const allVisible = useMemo(
    () => !nodesVisibilityArr.some((n) => n.isHidden),
    [nodesVisibilityArr],
  );

  return {
    filteredRelationNodes,
    nodesVisibilityArr,
    hideRelationNodes,
    showRelationNodes,
    toggleNodeVisibility,
    focusNode,
    focusMode,
    exitFocus: () => setFocusMode(undefined),
    allVisible,
    focusedNodes,
  };
});

export const useRelationNodesState = useRelationNodes.useContainer;
export const RelationNodesProvider = useRelationNodes.Provider;
