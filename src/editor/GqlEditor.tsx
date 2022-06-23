import React, { useEffect } from 'react';
import { GqlCodePane } from './code';
import { PassedSchema, Theming } from '@/Models';
import { style } from 'typestyle';
import { useTreesState, useTheme, useLayoutState } from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { DarkTheme, EditorTheme } from '@/gshared/theme/DarkTheme';

export const Main = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  height: '100%',
  width: '100%',
  alignItems: 'stretch',
  overflowY: 'clip' as any,
});

export const FullScreenContainer = style({
  flex: 1,
  alignSelf: 'stretch',
  height: '100%',
});

export const Sidebar = style({
  alignSelf: 'stretch',
  zIndex: 2,
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
});

export const ErrorOuterContainer = style({
  width: '100%',
  position: 'relative',
  display: 'flex',
  overflow: 'auto',
});

export interface GqlEditorProps extends Theming {
  readonly?: boolean;
  placeholder?: string;
  schema: PassedSchema;
  gql: string;
  setGql: (gql: string) => void;
  theme?: EditorTheme;
}

export const GqlEditor = ({
  placeholder,
  schema = {
    code: '',
    libraries: '',
  },
  gql,
  readonly: editorReadOnly,
  theme = DarkTheme,
  setGql,
}: GqlEditorProps) => {
  const { setTheme } = useTheme();

  const { setReadonly, schemaType, readonly } = useTreesState();
  const { sidebarSize } = useLayoutState();

  useEffect(() => {
    if (theme) {
      setTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    setReadonly(!!editorReadOnly);
  }, [editorReadOnly, schemaType]);

  return (
    <div
      data-cy={GraphQLEditorDomStructure.tree.editor}
      className={Main}
      onKeyDown={(e) => {
        if (e.key.toLowerCase() === 'f' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
        }
      }}
    >
      <GqlCodePane
        gql={gql}
        size={sidebarSize}
        onChange={(v, isInvalid) => {
          setGql(v);
        }}
        schema={[schema.libraries || '', schema.code].join('\n')}
        placeholder={placeholder}
        readonly={readonly}
      />
    </div>
  );
};
