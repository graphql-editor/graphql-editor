import React, { useState } from 'react';
import { ValueDefinition } from 'graphql-zeus';
import { style } from 'typestyle';
import { ConvertValueToEditableString } from '@/GraphQL/Convert';
import {
  DetailMenuItem,
  FieldPort,
  Menu,
  MenuScrollingArea,
  NodeFieldContainer,
  Title,
} from '@/Graf/Node/components';
import { FieldProps } from '@/Graf/Node/models';
import { themed } from '@/Theming/utils';

const Name = style({
  fontSize: 10,
  marginRight: 4,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
const DirectiveBackground = themed(
  ({
    colors: {
      backgrounds: { directive },
    },
  }) => style({ background: directive }),
);
const OptionsMenuContainer = style({
  position: 'absolute',
  top: 32,
  zIndex: 2,
  right: 5,
});

export const ActiveDirective: React.FC<FieldProps> = ({
  node,
  inputOpen,
  inputDisabled,
  outputOpen,
  outputDisabled,
  onInputClick,
  onOutputClick,
  isLocked,
  onDelete,
}) => {
  const [detailsMenuOpen, setDetailsMenuOpen] = useState(false);
  const isEnumValue = node.data.type === ValueDefinition.EnumValueDefinition;
  return (
    <NodeFieldContainer
      className={`${DirectiveBackground} ${
        inputOpen || outputOpen ? 'Active' : ''
      }`}
    >
      {!inputDisabled && !isLocked && !isEnumValue ? (
        <FieldPort
          onClick={onInputClick}
          open={inputOpen}
          info={{
            message: 'Edit directive arguments',
            placement: 'left',
          }}
        />
      ) : (
        <div className={'NodeFieldPortPlaceholder'} />
      )}
      <Title>
        <div className={Name}>{ConvertValueToEditableString(node)}</div>
      </Title>
      {!isLocked && (
        <FieldPort
          icons={{ closed: 'More', open: 'More' }}
          onClick={() => {
            setDetailsMenuOpen(!detailsMenuOpen);
          }}
        >
          {detailsMenuOpen && (
            <div className={OptionsMenuContainer}>
              <Menu
                menuName={'Node options'}
                hideMenu={() => setDetailsMenuOpen(false)}
              >
                <MenuScrollingArea>
                  <DetailMenuItem onClick={onDelete}>Delete</DetailMenuItem>
                </MenuScrollingArea>
              </Menu>
            </div>
          )}
        </FieldPort>
      )}
      {!outputDisabled && (
        <FieldPort
          onClick={onOutputClick}
          open={outputOpen}
          info={{
            message: `Expand ${node.type.name} details`,
            placement: 'right',
          }}
        />
      )}
      {outputDisabled && isLocked && (
        <div className={'NodeFieldPortPlaceholder'} />
      )}
    </NodeFieldContainer>
  );
};
