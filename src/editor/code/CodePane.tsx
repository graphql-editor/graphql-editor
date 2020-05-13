import cx from 'classnames';
import * as monaco from 'monaco-editor';
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import * as Icon from '../icons';
import { StatusDot, TitleOfPane } from './Components';
import * as styles from './style/Code';
import { StatusDotProps } from './style/Components';
import { theme, language, conf, settings, mapEditorErrorToMonacoDecoration } from './monaco';
import { EditorError } from '../../validation';
import { Workers } from '../../worker';
import { cypressGet, GraphQLEditorCypress } from '../../cypress_constants';
import { fontFamily } from '../../vars';

export interface CodePaneOuterProps {
  readonly?: boolean;
  placeholder?: string;
}

export type CodePaneProps = {
  size: number | string;
  schema: string;
  onChange: (v: string) => void;
  libraries?: string;
} & CodePaneOuterProps;

monaco.languages.register({ id: 'graphqle' });
monaco.languages.setLanguageConfiguration('graphqle', conf);
monaco.languages.setMonarchTokensProvider('graphqle', language);
monaco.editor.defineTheme('graphql-editor', theme);

/**
 * React compontent holding GraphQL IDE
 */
export const CodePane = (props: CodePaneProps) => {
  const { schema, libraries = '', onChange, readonly, size } = props;
  const editor = useRef<HTMLDivElement>(null);
  const [monacoGql, setMonacoGql] = useState<monaco.editor.IStandaloneCodeEditor>();
  const [decorationIds, setDecorationIds] = useState<string[]>([]);
  const [errors, setErrors] = useState<EditorError[]>([]);
  const generateEnabled = !readonly && errors.length === 0;

  useEffect(() => {
    if (editor.current) {
      monacoGql?.dispose();
      const model = monacoGql?.getModel();
      if (model) {
        model.dispose();
      }
      const m = monaco.editor.create(editor.current, settings());
      m.updateOptions({
        readOnly: readonly,
        fontFamily,
      });
      monaco.editor.remeasureFonts();
      m.setValue(schema);
      m.onDidChangeModelContent((e) => {
        const value = m!.getModel()!.getValue();
        Workers.validate(value, libraries).then((errors) => {
          setErrors(errors);
        });
      });
      m.onDidBlurEditorText(() => {
        const value = m!.getModel()!.getValue();
        if (value.length === 0) {
          onChange(value);
          return;
        }
        Workers.validate(value, libraries).then((errors) => {
          if (errors.length === 0) {
            onChange(value);
          }
        });
      });
      setMonacoGql(m);
      setTimeout(() => m.layout(), 100);
    }
    return () => monacoGql?.dispose();
  }, [libraries]);
  useEffect(() => {
    if (monacoGql) {
      const monacoDecorations = errors.map(mapEditorErrorToMonacoDecoration);
      const newDecorationIds = monacoGql.deltaDecorations(decorationIds, monacoDecorations);
      setDecorationIds(newDecorationIds);
    }
  }, [JSON.stringify(errors)]);
  useEffect(() => {
    function handleResize() {
      monacoGql?.layout();
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [monacoGql]);
  useEffect(() => {
    monacoGql?.layout();
  }, [size]);
  useEffect(() => {
    monacoGql?.setValue(schema);
  }, [schema]);
  useLayoutEffect(() => {
    monaco.editor.remeasureFonts();
  }, [schema]);

  const monacoEditorModel = monacoGql?.getModel();
  const monacoEditorValue = monacoEditorModel && monacoEditorModel.getValue();
  const holder = useRef<HTMLDivElement>(null);
  const syncStatus = readonly
    ? StatusDotProps.readonly
    : monacoEditorValue !== schema
    ? StatusDotProps.nosync
    : StatusDotProps.sync;
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
            if (generateEnabled && monacoEditorValue) {
              onChange(monacoEditorValue);
            }
          }}
        >
          {generateEnabled ? (
            syncStatus === StatusDotProps.sync ? (
              ''
            ) : (
              <>
                <span style={{ marginRight: 5 }}>synchronize</span>
                <Icon.Settings size={14} />
              </>
            )
          ) : readonly ? (
            'readonly'
          ) : (
            ''
          )}
        </div>
        <StatusDot status={syncStatus} />
      </TitleOfPane>
      <div
        className={cx(styles.CodeContainer)}
        ref={holder}
        data-cy={cypressGet(GraphQLEditorCypress, 'sidebar', 'code', 'name')}
      >
        <div ref={editor} className={styles.Editor} />
      </div>
    </>
  );
};
