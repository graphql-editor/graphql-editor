import cx from 'classnames';
import * as monaco from 'monaco-editor';
import React, { useEffect, useRef, useState } from 'react';
import { GraphController } from '../../Graph';
import * as Icon from '../icons';
import { StatusDot, TitleOfPane } from './Components';
import * as styles from './style/Code';
import { StatusDotProps } from './style/Components';
import { theme, language, conf, settings, mapEditorErrorToMonacoDecoration } from './monaco';
import { EditorError } from '../../validation';
import { Workers } from '../../worker';

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
  errors: EditorError[];
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
  const [decorationIds, setDecorationIds] = useState<string[]>([]);
  const [state, setState] = useState<CodePaneState>({
    hideEditor: false,
    errors: [],
  });
  useEffect(() => {
    if (editor.current) {
      monaco.editor.defineTheme('graphql-editor', theme);
      const m = monaco.editor.create(editor.current, settings());
      m.setValue(schema);
      m.onDidChangeModelContent(() => {
        codeChange(m!.getModel()!.getValue());
      });
      m.onDidBlurEditorText(() => {
        if (generateEnabled && code !== schema) {
          controller.loadGraphQL(code);
        }
      });
      setMonacoGql(m);
      setTimeout(() => m.layout(), 100);
    }
    return () => monacoGql?.dispose();
  }, []);
  useEffect(() => {
    if (monacoGql) {
      const monacoDecorations = state.errors.map(mapEditorErrorToMonacoDecoration);
      const newDecorationIds = monacoGql.deltaDecorations(decorationIds, monacoDecorations);
      setDecorationIds(newDecorationIds);
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
  const codeChange = (changedCode: string) => {
    if (!code && schemaChanged) {
      schemaChanged(changedCode);
    }
    setCode(changedCode);
    Workers.validate(changedCode, stitches).then((errors) => {
      setState({
        ...state,
        errors,
      });
    });
  };

  const generateEnabled = !readonly && !!code && state.errors.length === 0;
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
        <div ref={editor} className={styles.Editor} />
      </div>
    </>
  );
};
