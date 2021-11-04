import React from 'react';
import { style } from 'typestyle';
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

const Main = themed(({ backgroundedText, background: { mainClose } }) =>
  style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: 31,
    color: backgroundedText,
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
            background: mainClose,
          },
        },
      },
    },
  }),
);
const Type = style({ fontSize: FIELD_TYPE_SIZE });
type FieldProps = Pick<GrafFieldProps, 'node' | 'parentNodeTypeName'> & {
  onClick: () => void;
  active?: boolean;
  isPrimitive?: boolean;
};
const ChangeTitle = themed((theme) =>
  style({
    marginRight: 0,
  }),
);
const ChangeTitleActive = themed((theme) =>
  style({
    margin: `0 -20px`,
    padding: `5px 25px`,
    borderBottomWidth: 1,
    borderBottomColor: theme.background.mainClose,
    borderBottomStyle: 'solid',
    marginBottom: -1,
  }),
);
export const Field: React.FC<FieldProps> = ({
  node,
  parentNodeTypeName,
  onClick,
  active,
  isPrimitive,
}) => {
  const { parentTypes } = useTreesState();
  const { theme } = useTheme();
  return (
    <div
      onClick={(e) => {
        if (active && !isPrimitive) {
          e.stopPropagation();
          onClick();
        }
      }}
      className={`NodeType-${parentNodeTypeName} ${Main(theme)} ${
        active ? ' ActiveParent' : ''
      }`}
    >
      <Title
        className={`${ChangeTitle(theme)}${
          active ? ' ' + ChangeTitleActive(theme) : ''
        }`}
      >
        <div className={Name}>
          <ActiveFieldName
            data={node.data}
            name={node.name}
            args={node.args}
            parentTypes={parentTypes}
          />
        </div>
        <div className={Type}>
          <ActiveType
            onClick={() => {}}
            type={node.type}
            parentTypes={parentTypes}
          />
        </div>
      </Title>
    </div>
  );
};
