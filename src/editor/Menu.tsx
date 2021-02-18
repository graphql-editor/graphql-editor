import React from 'react';
import * as Icons from './icons';
import cx from 'classnames';
import { style } from 'typestyle';

import { Colors } from '@/Colors';
import { menuWidth } from '@/vars';
import { GraphQLEditorDomStructure } from '@/domStructure';

export const HiderPanel = style({
  width: menuWidth,
  background: Colors.main[10],
  color: Colors.grey[7],
  fontSize: 12,
  padding: 3,
  zIndex: 3,
});
export const Hider = style({
  width: 42,
  height: 42,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  cursor: 'pointer',
  $nest: {
    '&:hover': {
      background: Colors.grey[10],
    },
    '&.active': {
      color: Colors.pink[0],
    },
  },
});

export type ActivePane =
  | 'code'
  | 'diagram'
  | 'code-diagram'
  | 'hierarchy'
  | 'diff'
  | 'relation';
export interface MenuProps {
  activePane: ActivePane;
  excludePanes?: ActivePane[];
  setActivePane: (pane: ActivePane) => void;
}

const MenuChildren = GraphQLEditorDomStructure.tree.sidebar.menu.children;

export const Menu = ({
  setActivePane,
  activePane,
  excludePanes = [],
}: MenuProps) => {
  return (
    <div className={HiderPanel}>
      {!excludePanes.includes('diagram') && (
        <div
          data-cy={MenuChildren.diagram}
          className={cx(Hider, {
            active: activePane === 'diagram',
          })}
          onClick={() => setActivePane('diagram')}
          title="Diagram View"
        >
          <Icons.Eye size={18} />
        </div>
      )}
      {!excludePanes.includes('code-diagram') && (
        <div
          data-cy={MenuChildren.codeDiagram}
          className={cx(Hider, {
            active: activePane === 'code-diagram',
          })}
          onClick={() => setActivePane('code-diagram')}
          title="Code and Diagram View"
        >
          <Icons.Code size={18} />
        </div>
      )}
      {!excludePanes.includes('code') && (
        <div
          data-cy={MenuChildren.code}
          className={cx(Hider, {
            active: activePane === 'code',
          })}
          onClick={() => setActivePane('code')}
          title="Code View"
        >
          <Icons.FullScreen size={18} />
        </div>
      )}
      {!excludePanes.includes('hierarchy') && (
        <div
          data-cy={MenuChildren.hierarchy}
          className={cx(Hider, {
            active: activePane === 'hierarchy',
          })}
          onClick={() => setActivePane('hierarchy')}
          title="Hierarchy View"
        >
          <Icons.Layers size={18} />
        </div>
      )}
      {!excludePanes.includes('diff') && (
        <div
          data-cy={MenuChildren.diff}
          className={cx(Hider, {
            active: activePane === 'diff',
          })}
          onClick={() => setActivePane('diff')}
          title="Diff View"
        >
          <Icons.Filter size={18} />
        </div>
      )}
      {!excludePanes.includes('relation') && (
        <div
          data-cy={MenuChildren.relation}
          className={cx(Hider, {
            active: activePane === 'relation',
          })}
          onClick={() => setActivePane('relation')}
          title="Relation View"
        >
          <Icons.Play size={18} />
        </div>
      )}
    </div>
  );
};
