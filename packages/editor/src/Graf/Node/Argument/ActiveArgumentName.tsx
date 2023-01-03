import React from 'react';
import { ParserField } from 'graphql-js-tree';
import { EditableText } from '@/Relation/Node/EditableText';
export const ActiveArgumentName: React.FC<{
  afterChange: (newName: string) => void;
  node: ParserField;
}> = ({ afterChange, node }) => {
  const { name } = node;
  return <EditableText value={name} onChange={afterChange} />;
};
