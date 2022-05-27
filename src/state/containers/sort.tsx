import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { OperationType, ParserField } from 'graphql-js-tree';

type OrderType = {
  name: string;
  value: number;
};

const defaultOrderTypes: OrderType[] = [
  { name: 'type', value: 7 },
  { name: 'interface', value: 6 },
  { name: 'union', value: 5 },
  { name: 'enum', value: 4 },
  { name: 'scalar', value: 3 },
  { name: 'input', value: 2 },
  { name: 'directive', value: 1 },
  { name: 'extend', value: 0 },
];

const useSortStateContainer = createContainer(() => {
  const [isSortAlphabetically, setIsSortAlphabetically] = useState(false);
  const [orderTypes, setOrderTypes] = useState<OrderType[]>(defaultOrderTypes);

  const sortByTypes = (a: ParserField, b: ParserField) =>
    orderTypes.find((t) => t.name === b.type.name)!.value -
      orderTypes.find((t) => t.name === a.type.name)!.value ||
    a.name.localeCompare(b.name);

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
  };
});

export const useSortState = useSortStateContainer.useContainer;
export const SortStateProvider = useSortStateContainer.Provider;
