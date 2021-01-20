import { DiffEditorPane } from '@/editor/code';
import React from 'react';
import { style } from 'typestyle';

interface DiffEditorProps {
  schema: string;
  newSchema: string;
}

const Main = style({ display: 'flex', width: '100%', $debugName: 'DiffEditor' });
export const DiffEditor = ({ schema, newSchema }: DiffEditorProps) => {
  return (
    <div className={Main}>
      <DiffEditorPane schema={schema} newSchema={newSchema} size={`100vw-50px`} />
    </div>
  );
};
