import React, { useEffect } from 'react';
import { Menu } from './menu/Menu';
import { CodePane } from './code';
import { PassedSchema, Theming } from '@/Models';
import { DynamicResize } from './code/Components';
import { Graf } from '@/Graf/Graf';
import { Hierarchy } from '@/Hierarchy';
import { Parser, ParserTree } from 'graphql-js-tree';
import { Workers } from '@/worker';
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
import styled from '@emotion/styled';

const Main = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  width: 100%;
  align-items: stretch;
  overflow-y: clip;

  .full-screen-container {
    flex: 1;
    align-self: stretch;
    height: 100%;
  }
`;

const Sidebar = styled.div`
  align-self: stretch;
  z-index: 2;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  background: ${({ theme }) => theme.background.mainFurthest};
`;

const ErrorOuterContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  overflow: auto;
`;

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
  const { setTheme } = useTheme();

  const { menuState, setMenuState } = useNavigationState();
  const {
    grafErrors,
    setGrafErrors,
    setLockGraf,
    setLockCode,
    setGrafEditorErrors,
    setGrafErrorSchema,
  } = useErrorsState();
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
  const { isSortAlphabetically, sortByTypes, orderTypes, isUserOrder } =
    useSortState();
  const { setSidebarSize, sidebarSize } = useLayoutState();

  const reset = () => {
    setSnapshots([]);
    setUndos([]);
    setGrafErrors(undefined);
  };
  useEffect(() => {
    isSortAlphabetically &&
      !isUserOrder &&
      setTree({
        nodes: tree.nodes.sort(sortByTypes),
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
    if (!tree || !!tree.schema) {
      return;
    }
    if (tree.nodes.length === 0) {
      if (tree.initial) {
        return;
      }
      setSchema({ ...schema, isTree: true, code: '' });
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
              setGrafEditorErrors(errors);
              setGrafErrorSchema(graphql);
              setLockCode(msg);
              return;
            }
            setLockCode(undefined);
            setGrafErrors(undefined);
            setGrafEditorErrors([]);
            setSchema({ ...schema, code: graphql, isTree: true });
          });
        }
      });
    } catch (error) {
      const msg = (error as any).message;
      setLockCode(msg);
      setGrafErrors(msg);
      return;
    }
    onTreeChange?.(tree);
  }, [tree]);

  useEffect(() => {
    if (schema.isTree) {
      return;
    }
    generateTreeFromSchema(schema);
  }, [schema]);

  return (
    <Main
      data-cy={GraphQLEditorDomStructure.tree.editor}
      onKeyDown={(e) => {
        if (e.key.toLowerCase() === 'f' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
        }
      }}
    >
      <Menu
        toggleCode={!!menuState.code}
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
          enable={{ right: true }}
          disabledClass={!menuState.pane ? 'full-screen-container' : undefined}
          resizeCallback={(e, r, c, w) => {
            setSidebarSize(c.getBoundingClientRect().width);
          }}
          width={!menuState.pane ? '100%' : sidebarSize}
        >
          <Sidebar
            className={!menuState.pane ? 'full-screen-container' : undefined}
            data-cy={GraphQLEditorDomStructure.tree.sidebar.name}
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
              fullScreen={!menuState.pane}
              libraries={schemaType === 'library' ? '' : schema.libraries}
              placeholder={placeholder}
              readonly={readonly}
            />
          </Sidebar>
        </DynamicResize>
      )}
      {menuState.pane === 'diagram' && (
        <ErrorOuterContainer>
          <VisualStateProvider>
            <Graf />
          </VisualStateProvider>
        </ErrorOuterContainer>
      )}
      {menuState.pane === 'relation' && (
        <ErrorOuterContainer>
          <VisualStateProvider>
            <Relation />
          </VisualStateProvider>
        </ErrorOuterContainer>
      )}
      {menuState.pane === 'docs' && (
        <ErrorOuterContainer>
          <Docs />
        </ErrorOuterContainer>
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
    </Main>
  );
};
