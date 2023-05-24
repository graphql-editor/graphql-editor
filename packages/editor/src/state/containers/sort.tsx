import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import {
  AllTypes,
  OperationType,
  ParserField,
  TypeDefinition,
  TypeSystemDefinition,
} from "graphql-js-tree";
import { useTreesState } from "./trees";

type OrderType = {
  name: TypeDefinition | TypeSystemDefinition.DirectiveDefinition;
  value: number;
};

const defaultOrderTypes: OrderType[] = [
  { name: TypeDefinition.ObjectTypeDefinition, value: 7 },
  { name: TypeDefinition.InterfaceTypeDefinition, value: 6 },
  { name: TypeDefinition.UnionTypeDefinition, value: 5 },
  { name: TypeDefinition.EnumTypeDefinition, value: 4 },
  { name: TypeDefinition.ScalarTypeDefinition, value: 3 },
  { name: TypeDefinition.InputObjectTypeDefinition, value: 2 },
  { name: TypeSystemDefinition.DirectiveDefinition, value: 1 },
];

const useSortStateContainer = createContainer(() => {
  const { tree } = useTreesState();

  const [isSortAlphabetically, setIsSortAlphabetically] = useState(false);
  const [orderTypes, setOrderTypes] = useState<OrderType[]>(defaultOrderTypes);
  const [isInit, setIsInit] = useState(true);
  const [isUserOrder, setIsUserOrder] = useState(false);

  const sortByTypes = (a: ParserField, b: ParserField) => {
    const bValue = orderTypes.find((t) => t.name === b.data.type)
      ? orderTypes.find((t) => t.name === b.data.type)!.value
      : 0;
    const aValue = orderTypes.find((t) => t.name === a.data.type)
      ? orderTypes.find((t) => t.name === a.data.type)!.value
      : 0;
    return bValue - aValue || a.name.localeCompare(b.name);
  };

  const isTypeDefinition = (type?: AllTypes) =>
    !!type &&
    (type === TypeSystemDefinition.DirectiveDefinition ||
      type in TypeDefinition);

  useEffect(() => {
    if (tree.nodes.length && isInit && !isUserOrder) {
      setIsInit(false);
      const initialOrderTypes = new Set<AllTypes | undefined>();
      tree.nodes.forEach((node) => {
        isTypeDefinition(node.data.type) &&
          initialOrderTypes.add(node.data.type);
      });

      initialOrderTypes.add(TypeDefinition.ObjectTypeDefinition);
      initialOrderTypes.add(TypeDefinition.InterfaceTypeDefinition);
      initialOrderTypes.add(TypeDefinition.UnionTypeDefinition);
      initialOrderTypes.add(TypeDefinition.EnumTypeDefinition);
      initialOrderTypes.add(TypeDefinition.ScalarTypeDefinition);
      initialOrderTypes.add(TypeDefinition.InputObjectTypeDefinition);
      initialOrderTypes.add(TypeSystemDefinition.DirectiveDefinition);

      const initialOrderTypesArray = Array.from(initialOrderTypes);
      setOrderTypes(
        initialOrderTypesArray.map((a, i) => ({
          name: a as TypeDefinition | TypeSystemDefinition.DirectiveDefinition,
          value: i,
        }))
      );
    }
  }, [tree]);

  const sortAlphabetically = (a: ParserField, b: ParserField) =>
    a.name.localeCompare(b.name);

  const isNodeBaseType = (nodeOperations: OperationType[] | undefined) =>
    nodeOperations &&
    (nodeOperations.includes(OperationType.mutation) ||
      nodeOperations.includes(OperationType.query) ||
      nodeOperations.includes(OperationType.subscription));

  return {
    isSortAlphabetically,
    setIsSortAlphabetically,
    orderTypes,
    setOrderTypes,
    sortAlphabetically,
    sortByTypes,
    isNodeBaseType,
    isUserOrder,
    setIsUserOrder,
  };
});

export const useSortState = useSortStateContainer.useContainer;
export const SortStateProvider = useSortStateContainer.Provider;
