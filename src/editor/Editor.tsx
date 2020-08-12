import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import * as styles from './style/Editor';
import { sizeSidebar } from '../vars';
import { Menu, ActivePane } from './Menu';
import { CodePane } from './code';

import { GraphQLEditorCypress, cypressGet } from '../cypress_constants';
import { PassedSchema } from '../Models';
import { DynamicResize } from './code/Components';
import { Theming } from '../Models/Themable';
import { Graf } from '../Graf';

export interface EditorProps extends Theming {
  activePane?: ActivePane;
  readonly?: boolean;
  placeholder?: string;
  schema?: PassedSchema;
  onPaneChange?: (pane: ActivePane) => void;
  onSchemaChange?: (props: PassedSchema) => void;
}

export const Editor = ({
  readonly,
  placeholder,
  schema = {
    code: '',
    libraries: '',
  },
  initialSizeOfSidebar = sizeSidebar,
  activePane = 'code-diagram',
  onPaneChange,
}: EditorProps) => {
  const [diagramFocus, setDiagramFocus] = useState(false);
  const [code, setCode] = useState(schema.code);
  const [sidebarSize, setSidebarSize] = useState<string | number>(initialSizeOfSidebar);
  const [menuState, setMenuState] = useState<ActivePane>(activePane);

  useEffect(() => {
    setMenuState(activePane);
  }, [activePane]);

  return (
    <div
      data-cy={cypressGet(GraphQLEditorCypress, 'name')}
      style={{ display: 'flex', flexFlow: 'row nowrap', height: '100%', width: '100%', alignItems: 'stretch' }}
      onKeyDown={(e) => {
        if (!diagramFocus) {
          return;
        }
        if (e.key.toLowerCase() === 'f' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setMenuState('explorer-diagram');
        }
      }}
    >
      <Menu
        activePane={menuState}
        setActivePane={(pane) => {
          setMenuState(pane);
          if (onPaneChange) {
            onPaneChange(pane);
          }
        }}
      />
      {menuState !== 'diagram' && (
        <DynamicResize
          disabledClass={menuState === 'code' ? styles.FullScreenContainer : undefined}
          resizeCallback={(e, r, c, w) => {
            setSidebarSize(c.getBoundingClientRect().width);
          }}
          width={menuState === 'code' ? '100%' : sidebarSize}
        >
          <div
            className={cx(styles.Sidebar, {
              [styles.FullScreenContainer]: menuState === 'code',
            })}
            data-cy={cypressGet(GraphQLEditorCypress, 'sidebar', 'name')}
          >
            {(menuState === 'code' || menuState === 'code-diagram') && (
              <CodePane
                size={menuState === 'code' ? 100000 : sidebarSize}
                onChange={(v) => setCode(v)}
                schema={code}
                libraries={schema.libraries}
                placeholder={placeholder}
                readonly={readonly}
              />
            )}
          </div>
        </DynamicResize>
      )}
      <Graf
        onFocus={() => setDiagramFocus(true)}
        onBlur={() => setDiagramFocus(false)}
        schema={code}
        libraries={schema.libraries}
      />
      {menuState !== 'code' && <div></div>}
    </div>
  );
};
