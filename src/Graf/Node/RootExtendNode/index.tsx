import React, { useRef, useState } from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { PaintNode } from '@/Graf/Node/PaintNode';
import { MenuSearch } from '@/Graf/Node/components';
import { ExtendNodeMenu } from '@/Graf/Node/ContextMenu';
import { Plus } from '@/Graf/icons';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';
export interface RootExtendNodeProps {
  node: ParserField;
  libraryNode?: ParserField;
}
const NodeCaption = themed(
  ({
    colors: {
      graf: {
        rootExtendNode: { borderColor },
      },
    },
  }) =>
    style({
      flexBasis: '100%',
      margin: `15px 15px`,
      display: 'flex',
      borderBottom: `1px solid ${borderColor}22`,
      paddingBottom: 5,
      alignItems: 'center',
    }),
);
const CaptionTitle = themed(
  ({
    colors: {
      graf: {
        rootExtendNode: { borderColor },
      },
    },
  }) =>
    style({
      marginRight: 10,
      color: borderColor,
    }),
);
const NodeContainer = style({
  padding: 10,
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  height: '100%',
});

const ExtendButton = themed(
  ({
    colors: {
      graf: {
        rootExtendNode: { borderColor },
      },
    },
  }) =>
    style({
      position: 'relative',
      borderColor,
      borderWidth: 1,
      borderStyle: 'solid',
      padding: `5px 10px`,
      borderRadius: 4,
      width: 200,
      cursor: 'pointer',
      margin: 15,
      display: 'flex',
      alignItems: 'center',
      transition: `border-color 0.25s ease-in-out`,
    }),
);
const ExtendButtonTitle = themed(
  ({
    colors: {
      graf: {
        rootExtendNode: { color },
      },
    },
  }) =>
    style({
      padding: `0 5px`,
      fontSize: 12,
      color,
    }),
);

const ExtendMenuContainer = style({
  position: 'absolute',
  top: 30,
  right: -70,
});
const PlusButton = themed(
  ({
    colors: {
      graf: {
        rootExtendNode: { color },
      },
    },
  }) =>
    style({
      marginLeft: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      color,
      border: `1px solid ${color}11`,
      width: 20,
      height: 20,
      borderRadius: 10,
    }),
);

export const RootExtendNode: React.FC<RootExtendNodeProps> = ({
  node,
  libraryNode,
}) => {
  const thisNode = useRef<HTMLDivElement>(null);

  const [filterNodes, setFilterNodes] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();
  return (
    <div className={NodeContainer} ref={thisNode}>
      <div className={`${NodeCaption(theme)}`}>
        <span className={CaptionTitle(theme)}>extend</span>
        <MenuSearch
          onSubmit={() => {}}
          autoFocus={false}
          onClear={() => {
            setFilterNodes('');
          }}
          value={filterNodes}
          onChange={setFilterNodes}
        />
      </div>
      <div
        className={ExtendButton(theme)}
        onClick={() => {
          setMenuOpen(true);
        }}
      >
        <span className={ExtendButtonTitle(theme)}>Extend node</span>
        <span className={`${PlusButton(theme)}`}>
          <Plus width={10} height={10} />
        </span>
        {menuOpen && (
          <div className={ExtendMenuContainer}>
            <ExtendNodeMenu
              hideMenu={() => {
                setMenuOpen(false);
              }}
            />
          </div>
        )}
      </div>
      {node.args?.map((a, i) => {
        return (
          <PaintNode
            isMatchedToSearch={a.name
              .toLowerCase()
              .includes(filterNodes.toLowerCase())}
            key={a.name}
            node={a}
          />
        );
      })}
      {libraryNode?.args?.map((a) => {
        return (
          <PaintNode
            isMatchedToSearch={a.name
              .toLowerCase()
              .includes(filterNodes.toLowerCase())}
            isLibrary={true}
            key={a.name}
            node={a}
          />
        );
      })}
    </div>
  );
};
