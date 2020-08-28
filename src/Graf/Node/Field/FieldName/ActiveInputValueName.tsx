import React from 'react';
import { ParserField } from 'graphql-zeus';
import { EditableText } from './EditableText';
export const ActiveInputValueName: React.FC<{
  afterChange: (newName: string) => void;
  node: ParserField;
}> = ({ afterChange, node }) => {
  const { name } = node;
  return <EditableText value={name} onChange={afterChange} />;
};
