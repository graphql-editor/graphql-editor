import cx from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { GraphController } from '../Graph';
import * as styles from './style/Editor';
import { sizeSidebar } from '../vars';
import { Menu, ActivePane } from './Menu';
import { CodePane, Explorer } from './code';

import { c, cypressGet } from '../cypress_constants';
import { EditorNode } from '../Models';
import { DynamicResize } from './code/Components';

export interface CodeEditorOuterProps {
  readonly?: boolean;
  placeholder?: string;
}
export type EditorProps = {
  schema?: {
    code: string;
    libraries?: string;
  };
  graphController?: (controller: GraphController) => void;
} & CodeEditorOuterProps;

export interface MenuState {
  leftPaneHidden?: boolean;
  activePane: ActivePane;
}

const controller = new GraphController();
export const Editor = ({
  graphController,
  readonly,
  placeholder,
  schema = {
    code: '',
    libraries: '',
  },
}: EditorProps) => {
  const [controllerMounted, setControllerMounted] = useState(false);
  const [diagramFocus, setDiagramFocus] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<EditorNode[]>([]);
  const [errors, setErrors] = useState('');
  const [code, setCode] = useState('');
  const [libraries, setSchemaLibraries] = useState('');
  const [sidebarSize, setSidebarSize] = useState(sizeSidebar);
  const [menuState, setMenuState] = useState<ActivePane>('code-diagram');
  const [animationFrame, setAnimationFrame] = useState<number>();

  useEffect(() => {
    if (menuState === 'code') {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
      setControllerMounted(false);
      return;
    }
    if (!controllerMounted) {
      if (containerRef.current) {
        console.log(animationFrame);
        setControllerMounted(true);
        setAnimationFrame(
          window.requestAnimationFrame(() => {
            controller.setDOMElement(containerRef.current!);
            controller.setPassSchema((code, stitches) => {
              setSchemaLibraries(stitches);
              setCode(code);
              setErrors('');
            });
            controller.setPassDiagramErrors(setErrors);
            controller.setReadOnly(!!readonly);
            controller.setPassSelectedNodes(setNodes);
            if (graphController) {
              graphController(controller);
            }
          }),
        );
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
      data-cy={cypressGet(c, 'name')}
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
      <Menu activePane={menuState} setActivePane={setMenuState} />
      {menuState !== 'diagram' && (
        <DynamicResize
          disabledClass={menuState === 'code' ? styles.FullScreenContainer : undefined}
          resizeCallback={(e, r, c, w) => {
            setSidebarSize(c.getBoundingClientRect().width);
            if (controller && controllerMounted) {
              controller.resizeDiagram();
            }
          }}
          width={menuState === 'code' ? '100%' : sizeSidebar}
        >
          <div
            className={cx(styles.Sidebar, {
              [styles.FullScreenContainer]: menuState === 'code',
            })}
            data-cy={cypressGet(c, 'sidebar', 'name')}
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
            {menuState === 'explorer-diagram' && <Explorer selectedNodes={nodes} controller={controller} />}
          </div>
        </DynamicResize>
      )}
      {menuState !== 'code' && (
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
      )}
      {errors && <div className={styles.ErrorContainer}>{errors}</div>}
    </div>
  );
};
