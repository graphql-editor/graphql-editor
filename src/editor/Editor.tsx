import cx from 'classnames';
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { GraphController } from '../Graph';
import * as styles from './style/Editor';
import { sizeSidebar } from '../vars';
import { Menu, ActivePane } from './Menu';
import { CodePane } from './code';
import { Explorer } from './explorer';

import { GraphQLEditorCypress, cypressGet } from '../cypress_constants';
import { EditorNode, PassedSchema } from '../Models';
import { DynamicResize } from './code/Components';
import { Theming } from '../Models/Themable';

export interface EditorProps extends Theming {
  activePane?: ActivePane;
  readonly?: boolean;
  placeholder?: string;
  schema?: PassedSchema;
  onPaneChange?: (pane: ActivePane) => void;
  onSchemaChange?: (props: PassedSchema) => void;
  onGraphChange?: (graph: GraphController) => void;
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
  onGraphChange,
  onSchemaChange,
  onPaneChange,
}: EditorProps) => {
  const [controllerMounted, setControllerMounted] = useState(false);
  const [diagramFocus, setDiagramFocus] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNodes, setSelectedNodes] = useState<EditorNode[]>([]);
  const [nodes, setNodes] = useState<EditorNode[]>([]);
  const [errors, setErrors] = useState('');
  const [code, setCode] = useState('');
  const [libraries, setSchemaLibraries] = useState('');
  const [sidebarSize, setSidebarSize] = useState<string | number>(initialSizeOfSidebar);
  const [menuState, setMenuState] = useState<ActivePane>(activePane);
  const [controller] = useState(new GraphController());

  useEffect(() => {
    setMenuState(activePane);
  }, [activePane]);

  useLayoutEffect(() => {
    if (menuState === 'code') {
      return;
    }
    if (!controllerMounted) {
      if (containerRef.current && containerRef.current !== null) {
        controller.setDOMElement(containerRef.current!);
        if (onGraphChange) {
          onGraphChange(controller);
        }
        window.requestAnimationFrame(() => {
          controller.setPassSchema(({ code, libraries }) => {
            setSchemaLibraries(libraries || '');
            setCode(code);
            setErrors('');
            setNodes([...controller.nodes]);
            if (onSchemaChange) {
              onSchemaChange({ code, libraries });
            }
          });
          controller.setPassDiagramErrors(setErrors);
          controller.setReadOnly(!!readonly);
          controller.setPassSelectedNodes(setSelectedNodes);
          setControllerMounted(true);
        });
      }
    }
  }, [containerRef.current, menuState]);

  useEffect(() => {
    controllerMounted && controller.setReadOnly(!!readonly);
  }, [readonly]);

  useEffect(() => {
    if (controllerMounted) {
      controller.loadGraphQLAndLibraries({
        schema: schema.code,
        libraries: schema.libraries || '',
      });
    }
  }, [schema.libraries, schema.code, controllerMounted]);

  useEffect(() => {
    if (controller && controllerMounted) {
      controller.resizeDiagram();
    }
  }, [menuState]);

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
            if (controller && controllerMounted) {
              controller.resizeDiagram();
            }
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
                onChange={(v) =>
                  controller.loadGraphQLAndLibraries({
                    schema: v,
                    libraries: schema.libraries || '',
                  })
                }
                schema={code}
                libraries={libraries}
                placeholder={placeholder}
                readonly={readonly}
              />
            )}
            {menuState === 'explorer-diagram' && (
              <Explorer
                selectedNodes={selectedNodes}
                visibleNodes={nodes}
                centerOnNodeByID={controller.centerOnNodeByID}
              />
            )}
          </div>
        </DynamicResize>
      )}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          display: menuState !== 'code' ? 'block' : 'none',
        }}
        data-cy={cypressGet(GraphQLEditorCypress, 'diagram', 'name')}
        onFocus={() => setDiagramFocus(true)}
        onBlur={() => setDiagramFocus(false)}
        ref={containerRef}
      />
      {menuState !== 'code' && <div></div>}
      {errors && <div className={styles.ErrorContainer}>{errors}</div>}
    </div>
  );
};
