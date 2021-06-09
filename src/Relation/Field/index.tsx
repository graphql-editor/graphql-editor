import React from 'react';
import { style } from 'typestyle';
import { Colors } from '@/Colors';
import { FIELD_NAME_SIZE, FIELD_TYPE_SIZE } from '@/Graf/constants';
import { ActiveFieldName } from '@/Graf/Node/Field/FieldName';
import { ActiveType } from '@/Graf/Node/Type';
import { useTreesState } from '@/state/containers/trees';
import { Title } from '@/Graf/Node/components';
import { FieldProps as GrafFieldProps } from '@/Graf/Node/models';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';

const Name = style({
  fontSize: FIELD_NAME_SIZE,
  marginRight: 4,
  whiteSpace: 'nowrap',
  minWidth: 30,
});

const Main = themed(
  ({
    colors: {
      relation: {
        unknownField: { color, whenActiveParentBackground },
      },
    },
  }) =>
    style({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: 31,
      color,
      margin: `0 0`,
      transition: 'background 0.25s ease-in-out',
      $nest: {
        '.NodeFieldPortPlaceholder': {
          width: 24,
          height: 16,
        },
        '&.ActiveParent': {
          cursor: 'pointer',
          $nest: {
            '&:hover': {
              background: whenActiveParentBackground,
            },
          },
        },
      },
    }),
);
const Type = style({ fontSize: FIELD_TYPE_SIZE, color: Colors.green });
type FieldProps = Pick<GrafFieldProps, 'node' | 'parentNodeTypeName'> & {
  onClick: () => void;
  active?: boolean;
  isScalar?: boolean;
};
const ChangeTitle = style({
  marginRight: 0,
});
export const Field: React.FC<FieldProps> = ({
  node,
  parentNodeTypeName,
  onClick,
  active,
  isScalar,
}) => {
  const { parentTypes } = useTreesState();
  const { theme } = useTheme();
  return (
    <div
      onClick={(e) => {
        if (active || isScalar) {
          e.stopPropagation();
          onClick();
        }
      }}
      className={`NodeType-${parentNodeTypeName} ${Main(theme)} ${
        active ? ' ActiveParent' : ''
      }`}
    >
      <Title className={ChangeTitle}>
        <div className={Name}>
          <ActiveFieldName
            data={node.data}
            name={node.name}
            args={node.args}
            parentTypes={parentTypes}
          />
        </div>
        <div className={Type}>
          <ActiveType type={node.type} parentTypes={parentTypes} />
        </div>
      </Title>
    </div>
  );
};
