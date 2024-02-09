import { createContainer } from "unstated-next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTreesState } from "@/state/containers/trees";
import {
  AllTypes,
  getTypeName,
  ParserField,
  TypeDefinition,
  TypeExtension,
  TypeSystemDefinition,
} from "graphql-js-tree";
import { isExtensionNode } from "@/GraphQL/Resolve";

export const toggleableTypes: AllTypes[] = [
  TypeDefinition.ObjectTypeDefinition,
  TypeExtension.ObjectTypeExtension,
  TypeDefinition.UnionTypeDefinition,
  TypeExtension.UnionTypeExtension,
  TypeDefinition.InterfaceTypeDefinition,
  TypeExtension.InterfaceTypeExtension,
  TypeDefinition.InputObjectTypeDefinition,
  TypeExtension.InputObjectTypeExtension,
  TypeDefinition.EnumTypeDefinition,
  TypeExtension.EnumTypeExtension,
  TypeDefinition.ScalarTypeDefinition,
  TypeExtension.ScalarTypeExtension,
  TypeSystemDefinition.DirectiveDefinition,
];

const useRelationNodes = createContainer(() => {
  const { allNodes, setSelectedNodeId, selectedNodeId, focusMode } =
    useTreesState();

  const relationNodes = useMemo(
    () => allNodes.nodes.filter((n) => toggleableTypes.includes(n.data.type)),
    [allNodes]
  );

  const [nodesVisibilityArr, setNodesVisibilityArr] = useState(
    relationNodes.map((el) => ({ id: el.id, isHidden: false }))
  );

  const [typeRelatedToFocusedNode, setTypeRelatedToFocusedNode] = useState<
    ParserField[]
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
      prev.map((el) => ({ id: el.id, isHidden: true }))
    );
    setSelectedNodeId({ source: "relation", value: undefined });
  }, []);

  const showRelationNodes = useCallback(
    () =>
      setNodesVisibilityArr((prev) =>
        prev.map((el) => ({ id: el.id, isHidden: false }))
      ),
    []
  );

  const focusedNodes = useMemo(() => {
    setTypeRelatedToFocusedNode([]);
    const nId = focusMode;
    if (nId) {
      const n = allNodes.nodes.find((an) => an.id === nId);
      if (n) {
        const types = n.args.map((a) => getTypeName(a.type.fieldType));
        const argChild = n.args
          .flatMap((a) => a.args)
          .map((ca) => getTypeName(ca.type.fieldType));
        const argChildren = allNodes.nodes.filter((an) =>
          argChild.includes(an.name)
        );
        const children = allNodes.nodes.filter((an) => types.includes(an.name));
        const parents = allNodes.nodes.filter((an) =>
          an.args.some(
            (a) =>
              getTypeName(a.type.fieldType) === n.name ||
              a.args.some((aaa) => getTypeName(aaa.type.fieldType) === n.name)
          )
        );
        const interfacesRelatedToNode = allNodes.nodes.filter((node) =>
          n.interfaces.includes(node.name)
        );
        const nodesRelatedToInterface =
          n.data.type === TypeDefinition.InterfaceTypeDefinition
            ? allNodes.nodes.filter((node) => node.interfaces.includes(n.name))
            : [];

        const nodeExtensions = allNodes.nodes.filter(
          (node) => isExtensionNode(node.data.type) && node.name === n?.name
        );
        const basicNodeToNodeExtension =
          (isExtensionNode(n?.data.type) &&
            allNodes.nodes.filter(
              (node) =>
                node.name === n.name &&
                !isExtensionNode(node.data.type) &&
                node.id !== n.id
            )) ||
          [];
        const relatedFocusNodes = [
          ...children,
          ...parents,
          ...argChildren,
          ...interfacesRelatedToNode,
          ...nodesRelatedToInterface,
          ...(isExtensionNode(n.data.type) ? basicNodeToNodeExtension : [n]),
          ...nodeExtensions,
        ];
        return relatedFocusNodes
          .filter(
            (n, i) =>
              i === relatedFocusNodes.findIndex((rfn) => rfn.id === n.id)
          )
          .filter((n) => toggleableTypes.includes(n.data.type));
      }
    }
    return;
  }, [focusMode]);
  const filteredFocusedNodes = useMemo(() => {
    return focusedNodes?.filter((el) => {
      const foundNode = nodesVisibilityArr.find((el2) => el2.id === el.id);
      return foundNode ? !foundNode.isHidden : true;
    });
  }, [nodesVisibilityArr, focusedNodes]);

  const toggleNodeVisibility = useCallback(
    (node: ParserField) => {
      const newArr = [...nodesVisibilityArr];
      const foundIdx = newArr.findIndex((el) => el.id === node.id);
      newArr[foundIdx].isHidden = !newArr[foundIdx].isHidden;
      setNodesVisibilityArr(newArr);
      selectedNodeId?.value?.id === node.id &&
        setSelectedNodeId({ source: "navigation", value: undefined });
    },
    [nodesVisibilityArr]
  );

  const allVisible = useMemo(
    () => !nodesVisibilityArr.some((n) => n.isHidden),
    [nodesVisibilityArr]
  );

  const setTypeRelatedNodesToFocusedNode = useCallback(
    (node: ParserField) => {
      const alreadyExistsInTypeRelatedToFocusedNode =
        typeRelatedToFocusedNode.find((el) => el.id === node.id);
      const alreadyExistsInFocusedNodes = focusedNodes?.find(
        (el) => el.id === node.id
      );
      const isToggleableTypeNode = toggleableTypes.includes(node.data.type);
      if (
        !alreadyExistsInTypeRelatedToFocusedNode &&
        !alreadyExistsInFocusedNodes &&
        isToggleableTypeNode
      ) {
        setTypeRelatedToFocusedNode([...typeRelatedToFocusedNode, node]);
      }
    },
    [focusedNodes, typeRelatedToFocusedNode]
  );

  const filteredTypeRelatedToFocusedNode = useMemo(() => {
    return typeRelatedToFocusedNode?.filter((el) => {
      const foundNode = nodesVisibilityArr.find((el2) => el2.id === el.id);
      return foundNode ? !foundNode.isHidden : true;
    });
  }, [nodesVisibilityArr, typeRelatedToFocusedNode]);

  return {
    filteredRelationNodes,
    nodesVisibilityArr,
    hideRelationNodes,
    showRelationNodes,
    filteredFocusedNodes,
    toggleNodeVisibility,
    allVisible,
    focusedNodes,
    typeRelatedToFocusedNode,
    filteredTypeRelatedToFocusedNode,
    setTypeRelatedNodesToFocusedNode,
  };
});

export const useRelationNodesState = useRelationNodes.useContainer;
export const RelationNodesProvider = useRelationNodes.Provider;
