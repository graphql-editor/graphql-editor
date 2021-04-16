import cx from 'classnames';
import * as monaco from 'monaco-editor';
import React, { useEffect, useState, useMemo } from 'react';
import { StatusDot, TitleOfPane } from './Components';
import * as styles from './style/Code';
import { StatusDotProps } from './style/Components';
import { theme as MonacoTheme, language, conf, settings } from './monaco';
import { Workers } from '@/worker';
import { fontFamily } from '@/vars';
import { useErrorsState, useTheme } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
import HydraIDE from 'hydra-ide';
import { monacoSetDecorations } from '@/editor/code/monaco/setDecorations';
import { monacoScrollTo } from '@/editor/code/monaco/scrollTo';

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

/**
 * React compontent holding GraphQL IDE
 */
export const CodePane = (props: CodePaneProps) => {
  const { schema, libraries = '', onChange, readonly, size, scrollTo } = props;
  const [monacoGql, setMonacoGql] = useState<
    monaco.editor.IStandaloneCodeEditor
  >();
  const [decorationIds, setDecorationIds] = useState<string[]>([]);
  const { codeErrors, setCodeErrors } = useErrorsState();
  const { theme } = useTheme();

  useEffect(() => {
    if (scrollTo && monacoGql) {
      monacoScrollTo(monacoGql, scrollTo);
    }
  }, [scrollTo]);

  useEffect(() => {
    if (monacoGql) {
      monacoSetDecorations(
        codeErrors,
        monacoGql,
        decorationIds,
        setDecorationIds,
      );
    }
  }, [codeErrors, monacoGql]);

  useEffect(() => {
    if (monacoGql) {
      function handleResize() {
        monacoGql?.layout();
      }
      setTimeout(handleResize, 400);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [monacoGql, libraries, onChange]);

  const syncStatus = readonly ? StatusDotProps.readonly : StatusDotProps.sync;

  const codeTheme = useMemo(() => MonacoTheme(theme), [theme]);

  const codeSettings = useMemo(
    () => ({
      ...settings,
      fontFamily,
      readOnly: readonly,
    }),
    [readonly],
  );

  return (
    <>
      <TitleOfPane>
        <div
          className={cx(styles.Generate(theme), {
            disabled: !readonly,
          })}
        >
          {readonly ? 'readonly' : ''}
        </div>
        <StatusDot status={syncStatus} />
      </TitleOfPane>
      <div
        className={cx(styles.CodeContainer(theme))}
        data-cy={GraphQLEditorDomStructure.tree.elements.CodePane.name}
      >
        <HydraIDE
          value={schema}
          setValue={(v) => {
            Workers.validate(v, libraries).then((errors) => {
              setCodeErrors(errors);
            });
          }}
          setValueOnBlur={(v) => {
            Workers.validate(v, libraries).then((errors) => {
              onChange(v);
            });
          }}
          editorOptions={codeSettings}
          theme={codeTheme}
          depsToObserveForResize={[size]}
          onMonaco={(m) => {
            setMonacoGql(m);
          }}
        />
      </div>
    </>
  );
};
