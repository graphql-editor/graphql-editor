import React from 'react';
import * as Icons from './icons';
import cx from 'classnames';
import { cypressGet, GraphQLEditorCypress } from '../cypress_constants';
import { style } from 'typestyle';

import { Colors } from '@/Colors';
import { menuWidth } from '@/vars';

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

export type ActivePane = 'code' | 'diagram' | 'code-diagram' | 'hierarchy';
export interface MenuProps {
  activePane: ActivePane;
  setActivePane: (pane: ActivePane) => void;
}

export const Menu = ({ setActivePane, activePane }: MenuProps) => {
  return (
    <div className={HiderPanel}>
      <div
        data-cy={cypressGet(GraphQLEditorCypress, 'sidebar', 'menu', 'children', 'diagram', 'name')}
        className={cx(Hider, {
          active: activePane === 'diagram',
        })}
        onClick={() => setActivePane('diagram')}
        title="Diagram View"
      >
        <Icons.Eye size={18} />
      </div>
      <div
        data-cy={cypressGet(GraphQLEditorCypress, 'sidebar', 'menu', 'children', 'codeDiagram', 'name')}
        className={cx(Hider, {
          active: activePane === 'code-diagram',
        })}
        onClick={() => setActivePane('code-diagram')}
        title="Code and Diagram View"
      >
        <Icons.Code size={18} />
      </div>
      <div
        data-cy={cypressGet(GraphQLEditorCypress, 'sidebar', 'menu', 'children', 'code', 'name')}
        className={cx(Hider, {
          active: activePane === 'code',
        })}
        onClick={() => setActivePane('code')}
        title="Code View"
      >
        <Icons.FullScreen size={18} />
      </div>
      <div
        data-cy={cypressGet(GraphQLEditorCypress, 'sidebar', 'menu', 'children', 'hierarchy')}
        className={cx(Hider, {
          active: activePane === 'hierarchy',
        })}
        onClick={() => setActivePane('hierarchy')}
        title="Hierarchy View"
      >
        <Icons.Layers size={18} />
      </div>
    </div>
  );
};
