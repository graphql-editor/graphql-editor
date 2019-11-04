import cx from 'classnames';
import { buildASTSchema, parse } from 'graphql';
import React, { useEffect, useRef, useState } from 'react';
import AceEditor, { IAceEditorProps } from 'react-ace';
import { GraphController } from '../../Graph';
import { sizeSidebar } from '../../vars';
import * as Icon from '../icons';
import './ace/graphqleditor';
import './ace/graphqlschema';
import { StatusDot, TitleOfPane } from './Components';
import * as styles from './style/Code';
import { StatusDotProps } from './style/Components';
require(`brace/ext/searchbox`);
export interface CodePaneOuterProps {
  schemaChanged?: (schema: string) => void;
  readonly?: boolean;
  placeholder?: string;
  onResized: (width: number) => void;
}

export type AceEditorInstance = React.Component<IAceEditorProps, {}> & {
  editor?: { execCommand: (cmd: string) => {}; searchBox: { active: boolean } };
};

export type CodePaneProps = {
  schema: string;
  stitches?: string;
  controller: GraphController;
  codePaneWidth: number;
} & CodePaneOuterProps;
export interface CodePaneState {
  loadingUrl: boolean;
  isResizing?: boolean;
  errors?: Array<{
    row: number;
    column: number;
    type: 'error';
    text: string;
    position: number;
  }>;
  error?: string;
  hideEditor: boolean;
  fullScreen: boolean;
}

const resizeCodePaneAce = (editor: AceEditor, width: number) => {
  (editor as any).editor.container.style.width = `${width}px`;
};

/**
 * React compontent holding GraphQL IDE
 */
export const CodePane = (props: CodePaneProps) => {
  const {
    codePaneWidth,
    schema,
    schemaChanged,
    stitches,
    onResized,
    placeholder,
    readonly,
    controller
  } = props;
  const [code, setCode] = useState<string>(schema);
  const [editor, setEditor] = useState<AceEditor>();
  const [state, setState] = useState<CodePaneState>({
    loadingUrl: false,
    hideEditor: false,
    fullScreen: false
  });
  const holder = useRef<HTMLDivElement>(null);
  const toggleFullScreen = () => {
    if (state.fullScreen) {
      setState({
        ...state,
        fullScreen: false
      });
      onResized(sizeSidebar);
    } else {
      setState({
        ...state,
        fullScreen: true
      });
      onResized(window.innerWidth - 30);
    }
  };
  const codeChange = (
    e: string,
    v: {
      action: 'insert' | 'remove';
      lines: string[];
      end: {
        row: number;
        column: number;
      };
      start: {
        row: number;
        column: number;
      };
    }
  ) => {
    if (!code && schemaChanged) {
      schemaChanged(e);
    }
    setCode(e);
    const combinedCode = (stitches || '') + e;
    try {
      const parsed = parse(combinedCode);
      try {
        buildASTSchema(parsed);
        if (state.errors || state.error) {
          setState({
            ...state,
            errors: undefined,
            error: undefined
          });
        } else {
          setState(state);
        }
      } catch (error) {
        setState({
          ...state,
          error: error.message
        });
      }
    } catch (error) {
      const er = error as {
        locations: Array<{
          line: number;
          column: number;
        }>;
        message: string;
        positions: number[];
      };
      setState({
        ...state,
        errors: [
          {
            column: er.locations[0]!.column - 1,
            row: er.locations[0]!.line - 1,
            text: er.message,
            type: 'error',
            position: er.positions[0]
          }
        ]
      });
    }
  };

  useEffect(() => {
    if (code !== schema) {
      setCode(schema);
    } else {
      setCode(code);
    }
  }, [schema]);

  useEffect(() => {
    if (editor) {
      resizeCodePaneAce(editor, codePaneWidth);
    }
  }, [codePaneWidth]);

  const generateEnabled = !readonly && !!code && !state.error && !state.errors;
  const syncStatus = readonly
    ? StatusDotProps.readonly
    : code !== schema
    ? StatusDotProps.nosync
    : StatusDotProps.sync;
  const reloadGraph = () => {
    if (generateEnabled) {
      controller.loadGraphQL(code);
    }
  };

  return (
    <>
      <TitleOfPane>
        code editor
        <span
          className={cx(styles.FullScreenIcon, {
            active: state.fullScreen
          })}
          onClick={toggleFullScreen}
        >
          <Icon.FullScreen size={14} />
        </span>
        <div
          className={cx(styles.Generate, {
            disabled: !generateEnabled,
            ready: generateEnabled && syncStatus === StatusDotProps.nosync
          })}
          onClick={reloadGraph}
        >
          {generateEnabled ? (
            syncStatus === StatusDotProps.sync ? (
              'synchronized'
            ) : (
              <>
                <span style={{ marginRight: 5 }}>synchronize</span>
                <Icon.Settings size={14} />
              </>
            )
          ) : readonly ? (
            'readonly'
          ) : (
            'errors in code'
          )}
        </div>
        <StatusDot status={syncStatus} />
      </TitleOfPane>
      <div className={cx(styles.CodeContainer)} ref={holder}>
        {state.error && <div className={styles.ErrorLonger}>{state.error}</div>}
        <AceEditor
          ref={(ref) => {
            if (ref) {
              setEditor(ref);
              setTimeout(() => {
                (ref as any).editor.resize();
              }, 1);
            }
          }}
          placeholder={placeholder}
          mode={'graphqlschema'}
          annotations={state.errors}
          onChange={(value, event) => {
            codeChange(value, event);
          }}
          height="inherit"
          onBlur={() => {
            reloadGraph();
          }}
          readOnly={readonly}
          style={{
            flex: 1,
            height: 'auto'
          }}
          editorProps={{
            $blockScrolling: Infinity
          }}
          setOptions={{
            showLineNumbers: true,
            vScrollBarAlwaysVisible: true,
            tabSize: 2
          }}
          theme={'graphqleditor'}
          value={code}
          width={`${codePaneWidth}`}
          onLoad={() => {}}
        />
      </div>
    </>
  );
};
