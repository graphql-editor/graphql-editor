import { Colors, mix } from '@/Colors';
import { GraphQLBackgrounds, GraphQLDarkBackgrounds } from '@/editor/theme';
import { EditableText } from '@/Graf/Node/components';
import { ActiveType } from '@/Graf/Node/Type';
import { isScalarArgument } from '@/GraphQL/Resolve';
import { useTreesState } from '@/state/containers';
import { ParserField, TypeDefinition } from 'graphql-zeus';
import React, { useMemo } from 'react';
import { style } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { Field } from '../Field';
import * as Icons from '@/editor/icons';

const Content = style({
  padding: 20,
  margin: 20,
  textOverflow: 'elipssis',
  overflowY: 'hidden',
  border: `solid 1px ${Colors.blue[0]}00`,
  transition: '.25s all ease-in-out',
  zIndex: 1,
  flex: '1 0 auto',
  cursor: 'pointer',
  $nest: {
    '.NodeTitle': {
      alignItems: 'stretch',
      color: Colors.grey[1],
      fontSize: 14,
      padding: `10px 5px`,
      display: 'flex',
      $nest: {
        '.NodeName': {
          marginRight: 5,
        },
        '.NodeFocus': {
          marginLeft: 'auto',
          textTransform: 'lowercase',
          fontSize: 12,
          opacity: 0.0,
          pointerEvents: 'none',
          color: Colors.grey[2],
          display: 'flex',
          alignItems: 'center',
          $nest: {
            '&:hover': { color: Colors.grey[0] },
            span: { marginRight: 5 },
          },
          fontWeight: 'bold',
        },
      },
    },
    '&:hover': {
      border: `solid 1px ${Colors.blue[0]}`,
    },
    '&.Fade': {
      background: Colors.grey[9],
      $nest: {
        '.NodeRelationFields': {
          opacity: 0.25,
        },
        '.NodeTitle': {
          color: Colors.grey[7],
        },
        '.NodeType': {
          opacity: 0.25,
        },
        ...Object.keys(GraphQLDarkBackgrounds).reduce((a, b) => {
          a[`&.NodeBackground-${b}`] = {
            background: `${mix(
              GraphQLDarkBackgrounds[b],
              Colors.grey[10],
              22,
            )}00`,
          };
          return a;
        }, {} as Record<string, NestedCSSProperties>),
      },
    },
    '&.Active': {
      boxShadow: `${Colors.grey[10]} 2px 2px 10px`,
    },

    '&.Selected': {
      border: `solid 1px ${Colors.blue[0]}`,
      cursor: 'auto',
      $nest: {
        '.NodeFocus': {
          opacity: 1.0,
          pointerEvents: 'auto',
          cursor: 'pointer',
        },
      },
    },
    ...Object.keys(GraphQLDarkBackgrounds).reduce((a, b) => {
      a[`&.NodeBackground-${b}`] = {
        background: `${mix(GraphQLBackgrounds[b], Colors.grey[10], 40)}`,
      };
      return a;
    }, {} as Record<string, NestedCSSProperties>),
  },
});

interface NodeProps {
  field: ParserField;
  focus: () => void;
  fade?: boolean;
  setRef: (instance: HTMLDivElement) => void;
}

const EditableTitle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 'bold',
};
export const Node: React.FC<NodeProps> = ({ field, setRef, fade, focus }) => {
  const { setSelectedNode, selectedNode, tree } = useTreesState();
  const RelationFields = useMemo(() => {
    return (
      <div className={'NodeRelationFields'}>
        {field.args
          ?.filter((a) => !isScalarArgument(a))
          .map((a) => (
            <Field
              onClick={() => {
                setSelectedNode(
                  tree.nodes.find((tn) => tn.name === a.type.name),
                );
              }}
              active={
                selectedNode === field &&
                field.data.type !== TypeDefinition.EnumTypeDefinition
              }
              key={a.name}
              node={a}
              parentNodeTypeName={field.type.name}
            />
          ))}
      </div>
    );
  }, [selectedNode, field]);
  return (
    <div
      ref={(ref) => {
        if (ref) {
          setRef(ref);
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedNode(field);
      }}
      className={
        Content +
        ` NodeBackground-${field.type.name} ${
          fade ? 'Fade' : typeof fade === 'undefined' ? '' : 'Active'
        }` +
        (selectedNode === field ? ` Selected` : '')
      }
    >
      <div className={'NodeTitle'}>
        <div className={`NodeName`}>
          <EditableText style={EditableTitle} value={field.name} />
        </div>
        <div className={`NodeType`}>
          <ActiveType type={field.type} />
        </div>
        <div
          className={'NodeFocus'}
          onClick={(e) => {
            e.stopPropagation();
            focus();
          }}
        >
          <span>Focus</span>
          <Icons.Eye size={16} />
        </div>
      </div>
      <div className={'NodeRelationFields'}>{RelationFields}</div>
    </div>
  );
};
