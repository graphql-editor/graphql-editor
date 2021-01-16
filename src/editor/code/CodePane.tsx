import cx from 'classnames';
import * as monaco from 'monaco-editor';
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import * as Icon from '@/editor/icons';
import { StatusDot, TitleOfPane } from './Components';
import * as styles from './style/Code';
import { StatusDotProps } from './style/Components';
import { theme, language, conf, settings, mapEditorErrorToMonacoDecoration } from './monaco';
import { Workers } from '@/worker';
import { fontFamily } from '@/vars';
import { KeyboardActions, useErrorsState, useIOState } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';

export interface CodePaneOuterProps {
  readonly?: boolean;
  placeholder?: string;
}

export type CodePaneProps = {
  size: number | string;
  schema: string;
  onChange: (v: string, isInvalid?: boolean) => void;
  libraries?: string;
  scrollTo?: string;
} & CodePaneOuterProps;

monaco.languages.register({ id: 'graphqle' });
monaco.languages.setLanguageConfiguration('graphqle', conf);
monaco.languages.setMonarchTokensProvider('graphqle', language);
monaco.editor.defineTheme('graphql-editor', theme);

/**
 * React compontent holding GraphQL IDE
 */
export const CodePane = (props: CodePaneProps) => {
  const { schema, libraries = '', onChange, readonly, size, scrollTo } = props;
  const editor = useRef<HTMLDivElement>(null);
  const [monacoGql, setMonacoGql] = useState<monaco.editor.IStandaloneCodeEditor>();
  const [decorationIds, setDecorationIds] = useState<string[]>([]);
  const { codeErrors, setCodeErrors } = useErrorsState();
  const { setActions } = useIOState();
  const generateEnabled = !readonly;
  useEffect(() => {
    if (scrollTo) {
      const items = monacoGql
        ?.getModel()
        ?.findNextMatch(`${scrollTo}[\s|\{]`, { column: 0, lineNumber: 0 }, true, false, null, true);

      if (items) {
        const {
          range: { startLineNumber, endLineNumber, startColumn, endColumn },
        } = items;
        monacoGql?.setPosition({
          column: 0,
          lineNumber: startLineNumber,
        });
        monacoGql?.setPosition({ column: 0, lineNumber: startLineNumber });
        monacoGql?.revealPositionInCenter({ column: 0, lineNumber: startLineNumber }, monaco.editor.ScrollType.Smooth);
        monacoGql?.setSelection({
          startLineNumber,
          endLineNumber,
          startColumn,
          endColumn,
        });
      }
    }
  }, [scrollTo]);
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
          setCodeErrors(errors);
        });
      });
      m.onDidBlurEditorText(() => {
        const value = m!.getModel()!.getValue();
        if (value.length === 0) {
          onChange(value);
          return;
        }
        Workers.validate(value, libraries).then((errors) => {
          const isInvalid = errors.length > 0;
          onChange(value, isInvalid);
        });
      });
      setMonacoGql(m);
      setTimeout(() => m.layout(), 100);
    }
    return () => monacoGql?.dispose();
  }, [libraries, readonly]);
  useEffect(() => {
    if (monacoGql) {
      const monacoDecorations = codeErrors.map(mapEditorErrorToMonacoDecoration);
      const newDecorationIds = monacoGql.deltaDecorations(decorationIds, monacoDecorations);
      setDecorationIds(newDecorationIds);
    }
  }, [JSON.stringify(codeErrors), monacoGql]);
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
    const v = monacoGql?.getModel()?.getValue();
    if (v !== schema) {
      const cursorPos = monacoGql?.getPosition();
      monacoGql?.setValue(schema);
      if (cursorPos) {
        monacoGql?.setPosition(cursorPos);
      }
    }
  }, [schema, monacoGql]);
  useLayoutEffect(() => {
    monaco.editor.remeasureFonts();
  }, [schema]);

  const monacoEditorModel = monacoGql?.getModel();
  const monacoEditorValue = monacoEditorModel && monacoEditorModel.getValue();
  useEffect(() => {
    setActions((acts) => ({
      ...acts,
      [KeyboardActions.Save]: () => {
        const v = monacoGql?.getModel()?.getValue();
        if (v && generateEnabled) {
          Workers.validate(v, libraries).then((errors) => {
            const isInvalid = errors.length > 0;
            onChange(v, isInvalid);
            return;
          });
        }
      },
    }));
  }, [monacoGql, codeErrors]);

  const holder = useRef<HTMLDivElement>(null);
  const syncStatus = readonly
    ? StatusDotProps.readonly
    : monacoEditorValue !== schema
    ? StatusDotProps.nosync
    : StatusDotProps.sync;
  return (
    <>
      <TitleOfPane>
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
        data-cy={GraphQLEditorDomStructure.tree.elements.CodePane.name}
      >
        <div ref={editor} className={styles.Editor} />
      </div>
    </>
  );
};
