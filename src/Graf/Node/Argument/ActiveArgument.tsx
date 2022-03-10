import React, { useState } from 'react';
import { ParserField, Options, Value, TypeDefinition } from 'graphql-js-tree';
import { style } from 'typestyle';
import { NodeTypeOptionsMenu } from '@/Graf/Node/ContextMenu';
import { ActiveArgumentName } from './ActiveArgumentName';
import {
  DetailMenuItem,
  EditableDefaultValue,
  FieldPort,
  Menu,
  MenuScrollingArea,
  NodeFieldContainer,
  Title,
} from '@/Graf/Node/components';
import { isScalarArgument } from '@/GraphQL/Resolve';
import {
  ConvertStringToObject,
  ConvertValueToEditableString,
} from '@/GraphQL/Convert';
import { useTreesState } from '@/state/containers/trees';
import { FieldProps } from '@/Graf/Node/models';
const Name = style({ fontSize: 10, marginRight: 4, overflow: 'hidden' });
const OptionsMenuContainer = style({
  position: 'absolute',
  top: 20,
  zIndex: 2,
  right: 5,
});

interface PlaceFunctionArgs {
  v: string;
  node: ParserField;
  parentNodeOfArgument: ParserField;
}

const placeStringInNode = ({ node, v }: PlaceFunctionArgs) => {
  const valueType = isScalarArgument(node);
  const isObjectArg = !valueType || node.data.type === Value.ObjectValue;
  if (node.type.options?.includes(Options.array)) {
    return ConvertStringToObject(v);
  }
  if (isObjectArg) {
    return ConvertStringToObject(v);
  }
  if (valueType) {
    let value = v;
    if (valueType === Value.StringValue) {
      if (!(v.startsWith(`\"`) && v.endsWith(`\"`))) {
        //String must have ciapki
        return node.args;
      }
      value = v.slice(1, -1);
    }
    const n: ParserField = {
      data: {
        type: valueType,
      },
      type: {
        name: valueType,
      },
      name: value,
    };
    return [n];
  }
};

const resolveValueFromNode = (node: ParserField, parentNode: ParserField) => {
  const inside =
    node.args
      ?.map((a) => {
        if (a.data.type === Value.NullValue) {
          return 'null';
        }
        return ConvertValueToEditableString(a);
      })
      .join(',') || '';
  if (
    node.args &&
    node.args.length > 0 &&
    node.type.options?.includes(Options.array)
  ) {
    return `[ ${inside} ]`;
  }
  return inside;
};

export const ActiveArgument: React.FC<FieldProps> = ({
  node,
  parentNode,
  inputOpen,
  inputDisabled,
  outputOpen,
  outputDisabled,
  onInputClick,
  onOutputClick,
  parentNodeTypeName,
  isLocked,
  onDelete,
}) => {
  const { tree, setTree } = useTreesState();
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const [detailsMenuOpen, setDetailsMenuOpen] = useState(false);
  return (
    <NodeFieldContainer
      className={`NodeType-${parentNodeTypeName} ${
        inputOpen || outputOpen || optionsMenuOpen ? 'Active' : ''
      }`}
    >
      {!inputDisabled && !isLocked ? (
        <FieldPort
          onClick={onInputClick}
          open={inputOpen}
          info={{
            message: 'Edit field arguments',
            placement: 'left',
          }}
        />
      ) : (
        <div className={'NodeFieldPortPlaceholder'} />
      )}
      <Title>
        <div className={Name}>
          {isLocked && <span>{node.name}</span>}
          {!isLocked && (
            <ActiveArgumentName
              afterChange={(newName) => {
                node.name = newName;
                setTree({ ...tree });
              }}
              node={node}
            />
          )}
        </div>
        <EditableDefaultValue
          value={resolveValueFromNode(node, parentNode)}
          style={{ marginLeft: 5 }}
          onChange={(v) => {
            node.args = placeStringInNode({
              v,
              node,
              parentNodeOfArgument: parentNode,
            });
            setTree({ ...tree });
          }}
        />
      </Title>
      {!isLocked && node.data.type === TypeDefinition.InterfaceTypeDefinition && (
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
      {!isLocked && (
        <FieldPort
          icons={{ closed: 'Arrq', open: 'Arrq' }}
          onClick={() => {
            setOptionsMenuOpen(!optionsMenuOpen);
          }}
        >
          {optionsMenuOpen && (
            <div className={OptionsMenuContainer}>
              <NodeTypeOptionsMenu
                hideMenu={() => setOptionsMenuOpen(false)}
                node={node}
              />
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
