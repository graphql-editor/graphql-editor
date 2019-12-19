import cx from 'classnames';
import { Node } from 'graphsource';
import React, { useEffect, useRef, useState } from 'react';
import { GraphController } from '../../Graph';
import * as Icons from '../icons';
import { CodePane } from './CodePane';
import { Explorer } from './Explorer';
import * as styles from './style/Main';
export interface CodeEditorOuterProps {
  schemaChanged?: (schema: string) => void;
  readonly?: boolean;
  placeholder?: string;
}

export type CodeEditorProps = {
  schema: string;
  stitches?: string;
  controller: GraphController;
  selectedNodes: Node[];
  size: number;
} & CodeEditorOuterProps;
export interface CodeEditorState {
  loadingUrl: boolean;
  errors?: Array<{
    row: number;
    column: number;
    type: 'error';
    text: string;
    position: number;
  }>;
  error?: string;
  hideEditor: boolean;
  activePane: 'code' | 'explorer';
}

/**
 * React compontent holding GraphQL IDE
 */
export const CodeEditor = (props: CodeEditorProps) => {
  const [state, setState] = useState<CodeEditorState>({
    loadingUrl: false,
    hideEditor: false,
    activePane: 'code',
  });
  const { controller, placeholder, readonly, schema, schemaChanged, selectedNodes, stitches, size } = props;
  const refSidebar = useRef<HTMLDivElement>(null);
  const invokeFindListener = (e: any) => {
    if (e.key.toLowerCase() === 'f' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setState({
        ...state,
        activePane: 'explorer',
        hideEditor: false,
      });
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', invokeFindListener);
    return () => {
      document.removeEventListener('keydown', invokeFindListener);
    };
  }, []);
  return (
    <>
      <div className={styles.HiderPanel}>
        <div
          className={styles.Hider}
          onClick={() => {
            setState({
              ...state,
              hideEditor: !state.hideEditor,
            });
          }}
        >
          {state.hideEditor ? <Icons.Show size={16} /> : <Icons.Hide size={16} />}
        </div>
        <div
          className={cx(styles.Hider, {
            active: state.activePane === 'code' && !state.hideEditor,
          })}
          onClick={() =>
            setState({
              ...state,
              activePane: 'code',
              hideEditor: false,
            })
          }
        >
          <Icons.Code size={16} />
        </div>
        <div
          className={cx(styles.Hider, {
            active: state.activePane === 'explorer' && !state.hideEditor,
          })}
          onClick={() =>
            setState({
              ...state,
              activePane: 'explorer',
              hideEditor: false,
            })
          }
        >
          <Icons.Layers size={16} />
        </div>
      </div>

      {!state.hideEditor && (
        <div className={cx(styles.Sidebar)} ref={refSidebar}>
          {state.activePane === 'code' && (
            <CodePane
              size={size}
              controller={controller}
              schema={schema}
              stitches={stitches}
              schemaChanged={schemaChanged}
              placeholder={placeholder}
              readonly={readonly}
            />
          )}
          {state.activePane === 'explorer' && <Explorer selectedNodes={selectedNodes} controller={controller} />}
        </div>
      )}
    </>
  );
};
