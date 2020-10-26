import React, { useRef, useState } from 'react';
import { ParserField } from 'graphql-zeus';
import { style } from 'typestyle';
import { PaintNode } from '@/Graf/Node/PaintNode';
import { Colors } from '@/Colors';
import { MenuSearch } from '@/Graf/Node/components';
import { ExtendNodeMenu } from '@/Graf/Node/ContextMenu';
import { Plus } from '@/Graf/icons';
export interface RootExtendNodeProps {
  node: ParserField;
  libraryNode?: ParserField;
}
const NodeCaption = style({
  flexBasis: '100%',
  margin: `15px 15px`,
  display: 'flex',
  borderBottom: `1px solid ${Colors.orange[0]}22`,
  paddingBottom: 5,
  alignItems: 'center',
});
const CaptionTitle = style({
  marginRight: 10,
  color: Colors.orange[0],
});
const NodeContainer = style({
  padding: 10,
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  height: '100%',
});

const ExtendButton = style({
  position: 'relative',
  borderColor: Colors.orange[0],
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
});
const ExtendButtonTitle = style({
  padding: `0 5px`,
  fontSize: 12,
  color: Colors.grey[0],
});

const ExtendMenuContainer = style({
  position: 'absolute',
  top: 30,
  right: -70,
});
const PlusButton = style({
  marginLeft: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  color: Colors.grey[0],
  border: `1px solid ${Colors.grey[0]}11`,
  width: 20,
  height: 20,
  borderRadius: 10,
});

export const RootExtendNode: React.FC<RootExtendNodeProps> = ({ node, libraryNode }) => {
  const thisNode = useRef<HTMLDivElement>(null);

  const [filterNodes, setFilterNodes] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={`${NodeContainer}`} ref={thisNode}>
      <div className={`${NodeCaption}`}>
        <span className={CaptionTitle}>extend</span>
        <MenuSearch
          autoFocus={false}
          onClear={() => {
            setFilterNodes('');
          }}
          value={filterNodes}
          onChange={setFilterNodes}
        />
      </div>
      <div
        className={ExtendButton}
        onClick={() => {
          setMenuOpen(true);
        }}
      >
        <span className={ExtendButtonTitle}>Extend node</span>
        <span className={`${PlusButton}`}>
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
            isMatchedToSearch={a.name.toLowerCase().includes(filterNodes.toLowerCase())}
            key={a.name}
            node={a}
          />
        );
      })}
      {libraryNode?.args?.map((a) => {
        return (
          <PaintNode
            isMatchedToSearch={a.name.toLowerCase().includes(filterNodes.toLowerCase())}
            isLibrary={true}
            key={a.name}
            node={a}
          />
        );
      })}
    </div>
  );
};
