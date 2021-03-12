import React from 'react';
import { ParserField } from 'graphql-zeus';
import { compileTypeOptions } from '@/GraphQL/Compile';
import { useTheme } from '@/state/containers';
export const PaintType: React.FC<Pick<ParserField, 'type'>> = ({ type }) => {
  let compiledType = compileTypeOptions({ type });
  const { theme } = useTheme();
  return (
    <span
      style={{
        color:
          type.name in theme.colors.colors
            ? ((theme.colors.colors as any)[type.name] as string)
            : '#fff',
      }}
    >
      {compiledType}
    </span>
  );
};
