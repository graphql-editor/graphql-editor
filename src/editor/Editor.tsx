import { Node } from 'graphsource';
import { Resizable } from 're-resizable';
import React, { useEffect, useRef, useState } from 'react';
import { GraphController } from '../Graph';
import { CodeEditor, CodeEditorOuterProps } from './code';

import * as styles from './style/Editor';
import { sizeSidebar } from '../vars';
export interface EditorState {
  code: string;
  stitches?: string;
  errors: string;
  selectedNodes: Node[];
}
export type EditorProps = {
  editorVisible: boolean;
  schema?: string;
  graphController?: (controller: GraphController) => void;
} & CodeEditorOuterProps;

const controller = new GraphController();
export const Editor = ({
  graphController,
  schema,
  readonly,
  editorVisible,
  schemaChanged,
  placeholder,
}: EditorProps) => {
  const [controllerMounted, setControllerMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [errors, setErrors] = useState('');
  const [code, setCode] = useState(schema || '');
  const [sidebarSize, setSidebarSize] = useState(sizeSidebar);
  const [stitches, setStitches] = useState<string | undefined>();

  useEffect(() => {
    window.requestAnimationFrame(() => {
      // We should wait for next animation frame so TypeStyle
      // had its time to refresh all the classes - this way
      // our sizes won't break
      if (!containerRef.current) {
        return;
      }
      controller.setDOMElement(containerRef.current);
      controller.setPassSchema((code, stitches) => {
        setCode(code);
        setStitches(stitches);
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
  return (
    <div style={{ display: 'flex', flexFlow: 'row nowrap', height: '100%', width: '100%' }}>
      {editorVisible === true && (
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
            controller.resizeDiagram();
            setSidebarSize(c.getBoundingClientRect().width);
          }}
          maxWidth="100%"
          minWidth="1"
        >
          <CodeEditor
            size={sidebarSize}
            controller={controller}
            schema={code}
            stitches={stitches}
            readonly={readonly}
            placeholder={placeholder}
            selectedNodes={nodes}
            schemaChanged={(e) => {
              setCode(e);
              if (schemaChanged) {
                schemaChanged(e);
              }
            }}
          />
        </Resizable>
      )}
      <div
        style={{
          height: '100%',
          flex: 1,
        }}
        ref={containerRef}
      />
      {errors && <div className={styles.ErrorContainer}>{errors}</div>}
    </div>
  );
};
