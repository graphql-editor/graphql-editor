import React, { useState } from 'react';
import { ParserField, Options, Value } from 'graphql-zeus';
import { style } from 'typestyle';
import { Colors } from '@/Colors';
import { FIELD_HEIGHT } from '@/Graf/constants';
import { NodeTypeOptionsMenu } from '@/Graf/Node/ContextMenu';
import { ActiveArgumentName } from './ActiveArgumentName';
import { Arrq, Plus, Minus } from '@/Graf/icons';
import { EditableDefaultValue } from '@/Graf/Node/components';
import { isScalarArgument } from '@/GraphQL/Resolve';
import { ConvertStringToObject, ConvertValueToEditableString } from '@/GraphQL/Convert';
import { useTreesState } from '@/state/containers/trees';
export interface FieldProps {
  parentNode: ParserField;
  node: ParserField;
  inputOpen: boolean;
  outputOpen: boolean;
  onInputClick: () => void;
  onOutputClick: () => void;
  inputDisabled?: boolean;
  outputDisabled?: boolean;
  last?: boolean;
  isLocked?: boolean;
  parentNodeTypeName: string;
}

const Main = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  color: Colors.grey[0],
  height: FIELD_HEIGHT,
  margin: `0 0`,
  transition: 'background 0.25s ease-in-out',
  $nest: {
    '&.Active': {
      background: Colors.main[3],
      $nest: {
        '.NodeFieldPort': {
          opacity: 1,
        },
      },
    },
    '.NodeFieldPortPlaceholder': {
      width: 24,
      height: 16,
    },
    '&:hover': {
      background: Colors.main[3],
      $nest: {
        '.NodeFieldPort': {
          opacity: 0.5,
        },
      },
    },
    '.NodeFieldPort': {
      position: 'relative',
      width: 16,
      height: 16,
      borderRadius: 8,
      fontSize: 7,
      margin: `0 4px`,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: Colors.blue[6],
      cursor: 'pointer',
      opacity: 0.0,
      transition: 'all 0.25s ease-in-out',
      $nest: {
        '&:hover': {
          opacity: `1.0 !important`,
        },
      },
    },
  },
});
const LastField = style({
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
});
const Title = style({
  fontSize: 10,
  display: 'flex',
  flex: 1,
  alignItems: 'baseline',
  overflow: 'hidden',
});
const Name = style({ fontSize: 10, marginRight: 4, overflow: 'hidden' });
const OptionsMenuContainer = style({
  position: 'absolute',
  top: 20,
  zIndex: 2,
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
  if (node.args && node.args.length > 0 && node.type.options?.includes(Options.array)) {
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
  last,
  parentNodeTypeName,
  isLocked,
}) => {
  const { tree, setTree } = useTreesState();
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
  return (
    <div
      className={`NodeType-${parentNodeTypeName} ${Main} ${last ? LastField : ''} ${
        inputOpen || outputOpen || optionsMenuOpen ? 'Active' : ''
      }`}
    >
      {!inputDisabled && !isLocked ? (
        <div className={'NodeFieldPort'} onClick={onInputClick}>
          {inputOpen ? <Minus height={6} width={6} /> : <Plus height={8} width={8} />}
        </div>
      ) : (
        <div className={'NodeFieldPortPlaceholder'} />
      )}
      <div className={Title}>
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
          style={{ fontSize: 8, marginLeft: 5 }}
          onChange={(v) => {
            node.args = placeStringInNode({
              v,
              node,
              parentNodeOfArgument: parentNode,
            });
            setTree({ ...tree });
          }}
        />
      </div>
      {!isLocked && (
        <>
          <div
            className={'NodeFieldPort'}
            onClick={() => {
              setOptionsMenuOpen(!optionsMenuOpen);
            }}
          >
            <Arrq height={8} width={8} />
            {optionsMenuOpen && (
              <div className={OptionsMenuContainer}>
                <NodeTypeOptionsMenu hideMenu={() => setOptionsMenuOpen(false)} node={node} />
              </div>
            )}
          </div>
        </>
      )}
      {!outputDisabled && (
        <div className={'NodeFieldPort'} onClick={onOutputClick}>
          {outputOpen ? <Minus height={6} width={6} /> : <Plus height={8} width={8} />}
        </div>
      )}
      {outputDisabled && isLocked && <div className={'NodeFieldPortPlaceholder'} />}
    </div>
  );
};
