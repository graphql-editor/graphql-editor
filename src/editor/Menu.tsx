import React from 'react';
import * as Icons from './icons';
import cx from 'classnames';
import { style } from 'typestyle';

import { menuWidth } from '@/vars';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { useTheme } from '@/state/containers';
import { themed } from '@/Theming/utils';

export const HiderPanel = themed(({ colors: { background, disabled } }) =>
  style({
    width: menuWidth,
    background: background.mainFurthest,
    color: disabled,
    fontSize: 12,
    padding: 3,
    zIndex: 3,
  }),
);

export const Hider = themed(({ colors: { text, hover } }) =>
  style({
    width: 42,
    height: 42,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    cursor: 'pointer',
    $nest: {
      '&:hover': {
        color: hover,
      },
      '&.active': {
        color: hover,
      },
    },
  }),
);

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
  const { theme } = useTheme();
  return (
    <div className={HiderPanel(theme)}>
      {!excludePanes.includes('diagram') && (
        <div
          data-cy={MenuChildren.diagram}
          className={cx(Hider(theme), {
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
          className={cx(Hider(theme), {
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
          className={cx(Hider(theme), {
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
          className={cx(Hider(theme), {
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
          className={cx(Hider(theme), {
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
          className={cx(Hider(theme), {
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
