import cx from 'classnames';
import { Node } from 'graphsource';
import { Resizable } from 're-resizable';
import React, { useEffect, useRef, useState } from 'react';
import { GraphController } from '../Graph';
import * as styles from './style/Editor';
import { sizeSidebar } from '../vars';
import { Menu } from './Menu';
import { CodePane, Explorer } from './code';

import { c, cypressGet } from '../cypress_constants';

export interface CodeEditorOuterProps {
  readonly?: boolean;
  placeholder?: string;
}
export type EditorProps = {
  editorVisible: boolean;
  schema?: string;
  schemaLibraries?: string;
  graphController?: (controller: GraphController) => void;
} & CodeEditorOuterProps;

export interface MenuState {
  leftPaneHidden?: boolean;
  activePane: 'code' | 'explorer';
}

const controller = new GraphController();
export const Editor = ({
  graphController,
  schema,
  schemaLibraries,
  readonly,
  editorVisible,
  placeholder,
}: EditorProps) => {
  const [controllerMounted, setControllerMounted] = useState(false);
  const [diagramFocus, setDiagramFocus] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [errors, setErrors] = useState('');
  const [code, setCode] = useState(schema || '');
  const [libraries, setSchemaLibraries] = useState(schemaLibraries);
  const [sidebarSize, setSidebarSize] = useState(sizeSidebar);
  const [menuState, setMenuState] = useState<MenuState>({
    activePane: 'code',
    leftPaneHidden: false,
  });

  useEffect(() => {
    window.requestAnimationFrame(() => {
      if (!containerRef.current) {
        return;
      }
      controller.setDOMElement(containerRef.current);
      controller.setPassSchema((code, stitches) => {
        setCode(code);
        setSchemaLibraries(stitches);
        setErrors('');
      });
      controller.setPassDiagramErrors(setErrors);
      controller.setReadOnly(!!readonly);
      controller.setPassSelectedNodes(setNodes);
      if (graphController) {
        graphController(controller);
      }
      if (schema) {
        controller.loadGraphQL(schema);
      }
      setControllerMounted(true);
    });
  }, []);
  useEffect(() => {
    controllerMounted && controller.resizeDiagram();
  }, [editorVisible]);
  useEffect(() => {
    controllerMounted && controller.setReadOnly(!!readonly);
  }, [readonly]);
  useEffect(() => {
    if (typeof schema !== 'undefined' && schema !== code && controller) {
      controller.loadGraphQL(schema);
      setCode(schema);
    }
  }, [schema]);
  useEffect(() => {
    if (schemaLibraries !== libraries) {
      controller.loadLibraries(schemaLibraries);
      setSchemaLibraries(schemaLibraries);
    }
  }, [schemaLibraries]);
  return (
    <div
      data-cy={cypressGet(c, 'name')}
      style={{ display: 'flex', flexFlow: 'row nowrap', height: '100%', width: '100%', alignItems: 'stretch' }}
      onKeyDown={(e) => {
        if (!diagramFocus) {
          return;
        }
        if (e.key.toLowerCase() === 'f' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setMenuState({
            ...menuState,
            activePane: 'explorer',
            leftPaneHidden: false,
          });
        }
      }}
    >
      <Menu
        {...menuState}
        toggleCode={() =>
          setMenuState({
            ...menuState,
            activePane: 'code',
          })
        }
        toggleExplorer={() =>
          setMenuState({
            ...menuState,
            activePane: 'explorer',
          })
        }
        toggleShow={() => {
          setMenuState({
            ...menuState,
            leftPaneHidden: !menuState.leftPaneHidden,
          });
          controller!.resizeDiagram();
        }}
      />
      {editorVisible === true && !menuState.leftPaneHidden && (
        <Resizable
          defaultSize={{
            width: sizeSidebar,
            height: '100%',
          }}
          style={{
            display: 'flex',
            flexFlow: 'row nowrap',
            zIndex: 3,
          }}
          onResize={(e, r, c, w) => {
            setSidebarSize(c.getBoundingClientRect().width);
            controller.resizeDiagram();
          }}
          maxWidth="100%"
          minWidth="1"
        >
          <div className={cx(styles.Sidebar)} data-cy={cypressGet(c, 'sidebar', 'name')}>
            {menuState.activePane === 'code' && (
              <CodePane
                size={sidebarSize}
                controller={controller}
                schema={code}
                libraries={libraries}
                placeholder={placeholder}
                readonly={readonly}
              />
            )}
            {menuState.activePane === 'explorer' && <Explorer selectedNodes={nodes} controller={controller} />}
          </div>
        </Resizable>
      )}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
        }}
        data-cy={cypressGet(c, 'diagram', 'name')}
        onFocus={() => setDiagramFocus(true)}
        onBlur={() => setDiagramFocus(false)}
        ref={containerRef}
      />
      {errors && <div className={styles.ErrorContainer}>{errors}</div>}
    </div>
  );
};
