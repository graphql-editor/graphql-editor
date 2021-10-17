import { EditableText } from '@/Graf/Node/components';
import { ActiveType } from '@/Graf/Node/Type';
import { isScalarArgument } from '@/GraphQL/Resolve';
import { useTheme, useTreesState } from '@/state/containers';
import { ParserField, TypeDefinition } from 'graphql-js-tree';
import React, { useMemo, useState } from 'react';
import { style } from 'typestyle';
import { Field } from '../Field';
import * as Icons from '@/editor/icons';
import { themed } from '@/Theming/utils';

const Content = themed(
  ({
    shadow,
    backgroundedText,
    info,
    hover,
    background: { mainFurther, mainFar, mainMiddle },
  }) =>
    style({
      background: mainMiddle,
      padding: 20,
      margin: 20,
      textOverflow: 'elipssis',
      borderRadius: 10,
      overflowY: 'hidden',
      border: `solid 1px ${hover}00`,
      transition: '.25s all ease-in-out',
      zIndex: 1,
      flex: '1 0 auto',
      cursor: 'pointer',
      maxWidth: '50%',
      $nest: {
        '.NodeShowScalarsWrapper': {
          padding: '10px 5px',
          color: info,
          $nest: {
            '.NodeShowScalars': {
              display: 'flex',
              cursor: 'pointer',
              userSelect: 'none',
              alignItems: 'center',
              $nest: {
                '.NodeShowScalarsTitle': {
                  marginRight: 10,
                },
              },
            },
          },
        },
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
          border: `solid 1px ${hover}`,
        },
        '&.Fade': {
          background: mainFurther,
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
          border: `solid 1px ${hover}`,
          cursor: 'auto',
          $nest: {
            '.NodeFocus': {
              opacity: 1.0,
              pointerEvents: 'auto',
              cursor: 'pointer',
            },
          },
        },
      },
    }),
);

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
  const { setSelectedNode, selectedNode, tree, libraryTree } = useTreesState();
  const [showScalars, setShowScalars] = useState(false);
  const isNodeActive = field === selectedNode;
  const { theme } = useTheme();
  const RelationFields = useMemo(() => {
    const nodeFields = field.args?.filter((a) => !isScalarArgument(a));
    const scalarFields = field.args?.filter((a) => isScalarArgument(a));

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
        {scalarFields && scalarFields.length > 0 && (
          <div className={'NodeShowScalarsWrapper'}>
            <div
              className={'NodeShowScalars'}
              onClick={(e) => {
                if (!isNodeActive) return;
                e.stopPropagation();
                setShowScalars((prev) => !prev);
              }}
            >
              <div className={'NodeShowScalarsTitle'}>Scalars</div>
              {showScalars ? (
                <Icons.ToggleOn size={18} />
              ) : (
                <Icons.ToggleOff size={18} />
              )}
            </div>
            {showScalars &&
              scalarFields.map((scal) => (
                <Field
                  onClick={() => {}}
                  isPrimitive
                  key={scal.name}
                  node={scal}
                  parentNodeTypeName={field.type.name}
                />
              ))}
          </div>
        )}
      </div>
    );
  }, [field, isNodeActive, theme, showScalars]);
  const NodeContent = useMemo(
    () => (
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
        setSelectedNode(field);
      }}
      className={
        `${Content(theme)} ` +
        `${fade ? 'Fade' : typeof fade === 'undefined' ? '' : 'Active'}` +
        (selectedNode === field ? ` Selected` : '')
      }
    >
      {NodeContent}
      {RelationFields}
    </div>
  );
};
