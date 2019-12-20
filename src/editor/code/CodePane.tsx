import cx from 'classnames';
import { buildASTSchema, parse } from 'graphql';
import * as monaco from 'monaco-editor';
import React, { useEffect, useRef, useState } from 'react';
import { GraphController } from '../../Graph';
import * as Icon from '../icons';
import { StatusDot, TitleOfPane } from './Components';
import * as styles from './style/Code';
import { StatusDotProps } from './style/Components';
import { theme } from './monaco/theme';
import { language, conf } from './monaco/language';

export interface CodePaneOuterProps {
  schemaChanged?: (schema: string) => void;
  readonly?: boolean;
  placeholder?: string;
}

export type CodePaneProps = {
  size: number;
  schema: string;
  stitches?: string;
  controller: GraphController;
} & CodePaneOuterProps;
export interface CodePaneState {
  errors: Array<{
    row: number;
    column: number;
    type: 'error';
    text: string;
    position: number;
  }>;
  error?: string;
  hideEditor: boolean;
}
monaco.languages.register({ id: 'graphqle' });
monaco.languages.setLanguageConfiguration('graphqle', conf);
monaco.languages.setMonarchTokensProvider('graphqle', language);

/**
 * React compontent holding GraphQL IDE
 */
export const CodePane = (props: CodePaneProps) => {
  const { schema, schemaChanged, stitches, readonly, controller, size } = props;
  const [code, setCode] = useState<string>(schema);
  const editor = useRef<HTMLDivElement>(null);
  const [monacoGql, setMonacoGql] = useState<monaco.editor.IStandaloneCodeEditor>();
  const [state, setState] = useState<CodePaneState>({
    hideEditor: false,
    errors: [],
  });
  useEffect(() => {
    if (editor.current) {
      monaco.editor.defineTheme('graphql-editor', theme);
      const m = monaco.editor.create(editor.current, {
        language: 'graphqle',
        value: schema,
        glyphMargin: true,
        theme: 'graphql-editor',
      });
      m.onDidChangeModelContent(() => {
        codeChange(m!.getModel()!.getValue());
      });
      m.onDidBlurEditorText(() => {
        if (generateEnabled) {
          controller.loadGraphQL(code);
        }
      });
      setMonacoGql(m);
      setTimeout(() => m.layout(), 100);
    }
    return () => monacoGql?.dispose();
  }, []);
  useEffect(() => {
    if (state.errors) {
      console.log(state.errors);
      monacoGql?.deltaDecorations(
        [],
        state.errors.map(
          (e) =>
            ({
              range: new monaco.Range(e.row + 1, 1, e.row + 1, 1),
              options: {
                className: 'monacoError',
                isWholeLine: true,
                hoverMessage: {
                  value: e.text,
                },
                glyphMarginHoverMessage: {
                  value: e.text,
                },
                glyphMarginClassName: 'monacoMarginError',
              },
            } as monaco.editor.IModelDeltaDecoration),
        ),
      );
    }
  }, [JSON.stringify(state.errors)]);
  useEffect(() => {
    monacoGql?.layout();
  }, [size]);
  useEffect(() => {
    if (code !== schema) {
      setCode(schema);
      monacoGql?.setValue(schema);
    }
  }, [schema]);
  const holder = useRef<HTMLDivElement>(null);
  const codeChange = (e: string) => {
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
            errors: [],
            error: undefined,
          });
        } else {
          setState(state);
        }
      } catch (error) {
        setState({
          ...state,
          error: error.message,
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
            position: er.positions[0],
          },
        ],
      });
    }
  };

  const generateEnabled = !readonly && !!code && !state.error && !state.errors;
  const syncStatus = readonly ? StatusDotProps.readonly : code !== schema ? StatusDotProps.nosync : StatusDotProps.sync;
  return (
    <>
      <TitleOfPane>
        code editor
        <div
          className={cx(styles.Generate, {
            disabled: !generateEnabled,
            ready: generateEnabled && syncStatus === StatusDotProps.nosync,
          })}
          onClick={() => {
            if (generateEnabled) {
              controller.loadGraphQL(code);
            }
          }}
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
        <div ref={editor} className={styles.Editor} />
      </div>
    </>
  );
};
