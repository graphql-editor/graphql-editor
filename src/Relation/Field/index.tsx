import React from 'react';
import { style } from 'typestyle';
import { Colors } from '@/Colors';
import { FIELD_NAME_SIZE, FIELD_TYPE_SIZE } from '@/Graf/constants';
import { ActiveFieldName } from '@/Graf/Node/Field/FieldName';
import { ActiveType } from '@/Graf/Node/Type';
import { useTreesState } from '@/state/containers/trees';
import { Title } from '@/Graf/Node/components';
import { FieldProps as GrafFieldProps } from '@/Graf/Node/models';

const Name = style({
  fontSize: FIELD_NAME_SIZE,
  marginRight: 4,
  whiteSpace: 'nowrap',
  minWidth: 30,
});

const Main = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  color: Colors.grey[0],
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
          background: Colors.main[3],
        },
      },
    },
  },
});
const Type = style({ fontSize: FIELD_TYPE_SIZE, color: Colors.green[0] });
type FieldProps = Pick<GrafFieldProps, 'node' | 'parentNodeTypeName'> & {
  onClick: () => void;
  active?: boolean;
};
const ChangeTitle = style({
  marginRight: 0,
});
export const Field: React.FC<FieldProps> = ({
  node,
  parentNodeTypeName,
  onClick,
  active,
}) => {
  const { parentTypes } = useTreesState();
  return (
    <div
      onClick={(e) => {
        if (active) {
          e.stopPropagation();
          onClick();
        }
      }}
      className={`NodeType-${parentNodeTypeName} ${Main} ${
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
