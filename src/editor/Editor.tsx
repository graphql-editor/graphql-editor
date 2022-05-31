import cx from 'classnames';
import React, { useEffect } from 'react';
import { Menu } from './Menu';
import { CodePane } from './code';
import { PassedSchema, Theming } from '@/Models';
import { DynamicResize } from './code/Components';
import { Graf } from '@/Graf/Graf';
import { Hierarchy } from '@/Hierarchy';
import { Parser, ParserTree } from 'graphql-js-tree';
import { Workers } from '@/worker';
import { style } from 'typestyle';
import {
  useErrorsState,
  useNavigationState,
  useTreesState,
  useTheme,
  VisualStateProvider,
  useLayoutState,
} from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { DiffEditor } from '@/DiffEditor';
import { Relation } from '@/Relation/Relation';
import { DarkTheme, EditorTheme } from '@/gshared/theme/DarkTheme';
import { Docs } from '@/Docs/Docs';
import { useSortState } from '@/state/containers/sort';

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
});

export interface EditorProps extends Theming {
  state?: ReturnType<typeof useNavigationState>['menuState'];
  readonly?: boolean;
  placeholder?: string;
  schema: PassedSchema;
  diffSchemas?: {
    oldSchema: PassedSchema;
    newSchema: PassedSchema;
  };
  onStateChange?: (
    state?: ReturnType<typeof useNavigationState>['menuState'],
  ) => void;
  setSchema: (props: PassedSchema, isInvalid?: boolean) => void;
  onTreeChange?: (tree: ParserTree) => void;
  theme?: EditorTheme;
}

export const Editor = ({
  placeholder,
  schema = {
    code: '',
    libraries: '',
  },
  state,
  onStateChange,
  setSchema,
  diffSchemas,
  onTreeChange,
  readonly: editorReadOnly,
  theme = DarkTheme,
}: EditorProps) => {
  const { theme: currentTheme, setTheme } = useTheme();

  const { menuState, setMenuState } = useNavigationState();
  const { grafErrors, setGrafErrors, setLockGraf, setLockCode } =
    useErrorsState();
  const {
    tree,
    setTree,
    setSnapshots,
    setUndos,
    setLibraryTree,
    setReadonly,
    schemaType,
    generateTreeFromSchema,
    readonly,
  } = useTreesState();
  const { isSortAlphabetically, sortByTypes, orderTypes } = useSortState();
  const { setSidebarSize, sidebarSize } = useLayoutState();

  const reset = () => {
    setSnapshots([]);
    setUndos([]);
    setGrafErrors(undefined);
  };

  const generateSchemaFromTree = (schema: PassedSchema) => {
    if (!tree) {
      return;
    }
    if (tree.nodes.length === 0) {
      return;
    }
    try {
      Workers.generateCode(tree).then((graphql) => {
        if (graphql !== schema.code || (grafErrors?.length || 0) > 0) {
          Workers.validate(graphql, schema.libraries).then((errors) => {
            if (errors.length > 0) {
              const mapErrors = errors.map((e) => e.text);
              const msg = [
                ...mapErrors.filter((e, i) => mapErrors.indexOf(e) === i),
              ].join('\n\n');
              setGrafErrors(msg);
              setLockCode(msg);
              return;
            }
            setLockCode(undefined);
            setGrafErrors(undefined);
            setSchema({ ...schema, code: graphql });
          });
        }
      });
    } catch (error) {
      const msg = (error as any).message;
      setLockCode(msg);
      setGrafErrors(msg);
      return;
    }
  };

  useEffect(() => {
    isSortAlphabetically &&
      setTree({
        nodes: tree.nodes.sort(sortByTypes),
        schema: false,
      });
  }, [isSortAlphabetically, orderTypes]);

  useEffect(() => {
    if (theme) {
      setTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    if (schemaType === 'library') {
      setReadonly(true);
      return;
    }
    setReadonly(!!editorReadOnly);
  }, [editorReadOnly, schemaType]);

  useEffect(() => {
    if (schema.libraries) {
      setLibraryTree(Parser.parse(schema.libraries));
    } else {
      setLibraryTree({ nodes: [] });
    }
    reset();
  }, [schema.libraries]);

  useEffect(() => {
    if (state) {
      setMenuState(state);
    }
  }, [state]);

  useEffect(() => {
    onTreeChange?.(tree);
    generateSchemaFromTree(schema);
  }, [tree]);

  useEffect(() => {
    generateTreeFromSchema(schema);
  }, [schema]);
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
      <Menu
        toggleCode={!!menuState.code}
        schema={schema}
        setToggleCode={(e) =>
          setMenuState({
            ...menuState,
            code: !menuState.pane ? true : e,
          })
        }
        activePane={menuState.pane}
        excludePanes={diffSchemas ? undefined : ['diff']}
        setActivePane={(p) => {
          const pane =
            p === menuState.pane ? (menuState.code ? undefined : p) : p;
          const newState = { ...menuState, pane };
          setMenuState(newState);
          if (onStateChange) {
            onStateChange(newState);
          }
        }}
      />
      {menuState.code && menuState.pane !== 'diff' && (
        <DynamicResize
          disabledClass={!menuState.pane ? FullScreenContainer : undefined}
          resizeCallback={(e, r, c, w) => {
            setSidebarSize(c.getBoundingClientRect().width);
          }}
          width={!menuState.pane ? '100%' : sidebarSize}
        >
          <div
            className={cx(Sidebar, {
              [FullScreenContainer]: !menuState.pane,
            })}
            data-cy={GraphQLEditorDomStructure.tree.sidebar.name}
            style={{
              background: currentTheme.background.mainFurthest,
            }}
          >
            <CodePane
              size={!menuState.pane ? 100000 : sidebarSize}
              onChange={(v, isInvalid) => {
                if (isInvalid) {
                  setLockGraf(isInvalid);
                  return;
                }
                setSchema({ ...schema, code: v }, !!isInvalid);
              }}
              schema={
                schema.libraries && schemaType === 'library'
                  ? schema.libraries
                  : schema.code
              }
              libraries={schemaType === 'library' ? '' : schema.libraries}
              placeholder={placeholder}
              readonly={readonly}
            />
          </div>
        </DynamicResize>
      )}
      {menuState.pane === 'diagram' && (
        <div className={ErrorOuterContainer}>
          <VisualStateProvider>
            <Graf />
          </VisualStateProvider>
        </div>
      )}
      {menuState.pane === 'relation' && (
        <div className={ErrorOuterContainer}>
          <VisualStateProvider>
            <Relation />
          </VisualStateProvider>
        </div>
      )}
      {menuState.pane === 'docs' && (
        <div className={ErrorOuterContainer}>
          <Docs />
        </div>
      )}
      {menuState.pane === 'hierarchy' && <Hierarchy />}
      {menuState.pane === 'diff' && diffSchemas && (
        <DiffEditor
          schema={
            schemaType === 'library' && diffSchemas.oldSchema.libraries
              ? diffSchemas.oldSchema.libraries
              : diffSchemas.oldSchema.code
          }
          newSchema={
            schemaType === 'library' && diffSchemas.newSchema.libraries
              ? diffSchemas.newSchema.libraries
              : diffSchemas.newSchema.code
          }
        />
      )}
    </div>
  );
};
