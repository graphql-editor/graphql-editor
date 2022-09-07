import React, { useState } from 'react';
import { getTypeName, ValueDefinition } from 'graphql-js-tree';
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
import { NodeFieldPortPlaceholder } from '@/Graf/Node';
import styled from '@emotion/styled';

const Name = styled.div`
  font-size: 10px;
  margin-right: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DirectiveFieldContainer = styled(NodeFieldContainer)`
  color: ${({ theme }) => theme.backgrounds.directive};
`;

const OptionsMenuContainer = styled.div`
  position: absolute;
  top: 32px;
  z-index: 2;
  right: 5px;
`;

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
    <DirectiveFieldContainer
      className={`${inputOpen || outputOpen ? 'Active' : ''}`}
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
        <NodeFieldPortPlaceholder />
      )}
      <Title>
        <Name>{ConvertValueToEditableString(node)}</Name>
      </Title>
      {!isLocked && (
        <FieldPort
          icons={{ closed: 'More', open: 'More' }}
          onClick={() => {
            setDetailsMenuOpen(!detailsMenuOpen);
          }}
        >
          {detailsMenuOpen && (
            <OptionsMenuContainer>
              <Menu
                menuName={'Node options'}
                hideMenu={() => setDetailsMenuOpen(false)}
              >
                <MenuScrollingArea>
                  <DetailMenuItem onClick={onDelete}>Delete</DetailMenuItem>
                </MenuScrollingArea>
              </Menu>
            </OptionsMenuContainer>
          )}
        </FieldPort>
      )}
      {!outputDisabled && (
        <FieldPort
          onClick={onOutputClick}
          open={outputOpen}
          info={{
            message: `Expand ${getTypeName(node.type.fieldType)} details`,
            placement: 'right',
          }}
        />
      )}
      {outputDisabled && isLocked && <NodeFieldPortPlaceholder />}
    </DirectiveFieldContainer>
  );
};
