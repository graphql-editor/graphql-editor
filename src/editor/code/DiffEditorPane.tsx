import cx from 'classnames';
import * as monaco from 'monaco-editor';
import React, { useEffect, useRef, useState } from 'react';
import * as styles from './style/Code';
import { theme, language, conf, diffEditorSettings } from './monaco';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { fontFamily } from '@/vars';

export type DiffEditorPaneProps = {
  size: number | string;
  schema: string;
  newSchema: string;
};

monaco.languages.register({ id: 'graphqle' });
monaco.languages.setLanguageConfiguration('graphqle', conf);
monaco.languages.setMonarchTokensProvider('graphqle', language);
monaco.editor.defineTheme('graphql-editor', theme);

/**
 * React compontent holding GraphQL IDE
 */
export const DiffEditorPane = (props: DiffEditorPaneProps) => {
  const { schema, newSchema, size } = props;
  const editor = useRef<HTMLDivElement>(null);
  const [monacoGql, setMonacoGql] = useState<monaco.editor.IStandaloneDiffEditor>();
  useEffect(() => {
    if (editor.current) {
      const original = monaco.editor.createModel(schema, 'graphqle');
      const modified = monaco.editor.createModel(newSchema, 'graphqle');
      monacoGql?.dispose();
      const m = monaco.editor.createDiffEditor(editor.current, diffEditorSettings());
      m.updateOptions({
        fontFamily,
      });
      monaco.editor.remeasureFonts();
      m.onDidUpdateDiff(() => {
        var linesChanged = m.getLineChanges();
        alert(JSON.stringify(linesChanged));
      });
      m.setModel({ original, modified });
      setMonacoGql(m);
      setTimeout(() => m.layout(), 100);
      return () => monacoGql?.dispose();
    }
  }, []);
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

  return (
    <>
      <div className={cx(styles.CodeContainer)} data-cy={GraphQLEditorDomStructure.tree.elements.DiffEditor.name}>
        <div ref={editor} className={styles.Editor} />
      </div>
    </>
  );
};
