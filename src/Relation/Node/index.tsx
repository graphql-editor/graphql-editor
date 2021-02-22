import { Colors, mix } from '@/Colors';
import { GraphQLBackgrounds, GraphQLDarkBackgrounds } from '@/editor/theme';
import { EditableText } from '@/Graf/Node/components';
import { ActiveType } from '@/Graf/Node/Type';
import { isScalarArgument } from '@/GraphQL/Resolve';
import { useTreesState } from '@/state/containers';
import { ParserField } from 'graphql-zeus';
import React from 'react';
import { style } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { Field } from '../Field';

const Content = style({
  padding: 20,
  margin: 20,
  textOverflow: 'elipssis',
  overflowY: 'hidden',
  border: `solid 1px ${Colors.blue[0]}00`,
  transition: '.25s all ease-in-out',
  zIndex: 1,
  flex: '1 0 auto',
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
      },
    },
    '&:hover': {
      border: `solid 1px ${Colors.blue[0]}`,
    },
    '&.Fade': {
      opacity: 0.25,
    },
    '&.Active': {
      transform: 'scale(1.05)',
    },

    '&.Selected': {
      border: `solid 1px ${Colors.blue[0]}`,
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
  fade?: boolean;
  setRef: (instance: HTMLDivElement) => void;
}

const EditableTitle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 'bold',
};
export const Node: React.FC<NodeProps> = ({ field, setRef, fade }) => {
  const { setSelectedNode, selectedNode } = useTreesState();
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
      </div>
      <div>
        {field.args
          ?.filter((a) => !isScalarArgument(a))
          .map((a) => (
            <Field key={a.name} node={a} parentNodeTypeName={field.type.name} />
          ))}
      </div>
    </div>
  );
};
