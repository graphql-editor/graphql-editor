import { ActiveType } from '@/Graf/Node/Type';
import { useTheme, useTreesState } from '@/state/containers';
import { ParserField, TypeDefinition } from 'graphql-js-tree';
import React, { useMemo } from 'react';
import { style } from 'typestyle';
import { Field } from '../Field';
import * as Icons from '@/editor/icons';
import { themed } from '@/Theming/utils';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { FIELD_NAME_SIZE } from '@/Graf/constants';
import { fontFamily } from '@/vars';
import { compareNodesWithData } from '@/compare/compareNodes';

const Content = themed(
  ({
    shadow,
    backgroundedText,
    info,
    hover,
    background: { mainFurther, mainFar, mainMiddle },
    colors,
  }) =>
    style({
      background: mainMiddle,
      padding: 20,
      margin: 20,
      textOverflow: 'elipssis',
      borderRadius: 10,
      overflowY: 'hidden',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: `${hover}00`,
      transition: '.25s all ease-in-out',
      zIndex: 1,
      flex: '1 0 auto',
      cursor: 'pointer',
      maxWidth: '50%',
      $nest: {
        '.NodeTitle': {
          alignItems: 'stretch',
          color: backgroundedText,
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
              color: backgroundedText,
              display: 'flex',
              alignItems: 'center',
              $nest: {
                '&:hover': { color: backgroundedText },
                span: { marginRight: 5 },
              },
              fontWeight: 'bold',
            },
          },
        },
        '&:hover': {
          ...Object.keys(colors).reduce((a, b) => {
            a[`&.NodeBackground-${b}`] = {
              borderColor: `${(colors as any)[b]}`,
            };
            return a;
          }, {} as Record<string, NestedCSSProperties>),
        },
        '&.Library': {
          borderStyle: 'dashed',
        },
        '&.Fade': {
          background: mainFurther,
          opacity: 0.9,
          $nest: {
            '.NodeRelationFields': {
              opacity: 0.25,
            },
            '.NodeTitle': {
              color: backgroundedText,
              opacity: 0.5,
            },
            '.NodeType': {
              opacity: 0.25,
            },
          },
        },
        '&.Active': {
          boxShadow: shadow,
        },

        '&.Selected': {
          borderColor: hover,
          cursor: 'auto',
          $nest: {
            '.NodeFocus': {
              opacity: 1.0,
              pointerEvents: 'auto',
              cursor: 'pointer',
            },
          },
          ...Object.keys(colors).reduce((a, b) => {
            a[`&.NodeBackground-${b}`] = {
              borderColor: `${(colors as any)[b]}`,
            };
            return a;
          }, {} as Record<string, NestedCSSProperties>),
        },
      },
    }),
);

const NameInRelation = themed(({ text }) =>
  style({
    border: 0,
    background: 'transparent',
    color: text,
    minWidth: 'auto',
    padding: 0,
    fontFamily: fontFamily,
    fontSize: FIELD_NAME_SIZE,
  }),
);

interface NodeProps {
  field: ParserField;
  focus: () => void;
  isLibrary?: boolean;
  fade?: boolean;
  setRef: (instance: HTMLDivElement) => void;
}

export const Node: React.FC<NodeProps> = ({
  field,
  setRef,
  fade,
  focus,
  isLibrary,
}) => {
  const {
    setSelectedNode,
    selectedNode,
    tree,
    libraryTree,
    checkRelatedNodes,
  } = useTreesState();
  const isNodeActive = compareNodesWithData(field, selectedNode);
  const { theme } = useTheme();
  const RelationFields = useMemo(() => {
    const nodeFields = field.args;
    return (
      <div className={'NodeRelationFields'}>
        {nodeFields?.map((a) => (
          <Field
            onClick={() => {
              const allNodes = tree.nodes.concat(libraryTree.nodes);
              setSelectedNode(allNodes.find((tn) => tn.name === a.type.name));
            }}
            active={
              isNodeActive &&
              field.data.type !== TypeDefinition.EnumTypeDefinition
            }
            key={a.name}
            node={a}
            parentNodeTypeName={field.type.name}
          />
        ))}
      </div>
    );
  }, [field, isNodeActive, theme]);
  const NodeContent = useMemo(
    () => (
      <div className={'NodeTitle'}>
        <div className={`NodeName`}>
          <span className={NameInRelation(theme)}>{field.name}</span>
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
    ),
    [field, theme],
  );
  return (
    <div
      ref={(ref) => {
        if (ref) {
          setRef(ref);
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
        checkRelatedNodes(field);
        setSelectedNode(field);
      }}
      className={
        `NodeBackground-${field.type.name} ${Content(theme)} ` +
        `${fade ? 'Fade' : typeof fade === 'undefined' ? '' : 'Active'}` +
        `${isLibrary ? ' Library' : ''}` +
        (selectedNode === field ? ` Selected` : '')
      }
    >
      {NodeContent}
      {RelationFields}
    </div>
  );
};
