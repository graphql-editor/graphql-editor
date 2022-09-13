import React, { useEffect } from 'react';
import { Menu } from './menu/Menu';
import { CodePane } from './code';
import { PassedSchema, Theming } from '@/Models';
import { DynamicResize } from './code/Components';
import { Graf } from '@/Graf/Graf';
import { ParserTree } from 'graphql-js-tree';
import { GraphQLEditorWorker } from 'graphql-editor-worker';
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
import { EditorTheme } from '@/gshared/theme/DarkTheme';
import { Docs } from '@/Docs/Docs';
import { useSortState } from '@/state/containers/sort';
import styled from '@emotion/styled';
import { useRouter } from '@/state/containers/router';

const Main = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  width: 100%;
  align-items: stretch;
  overflow-y: clip;

  scrollbar-color: ${({ theme }) =>
    `${theme.background.mainClose} ${theme.background.mainFurthest}`};
  *::-webkit-scrollbar {
    background: ${({ theme }) => theme.background.mainClose};
  }
  *::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.background.mainClose};
  }
  *::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background.mainFurthest};
  }

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

const ErrorOuterContainer = styled.div<{ isOverflow?: boolean }>`
  width: 100%;
  position: relative;
  display: flex;
  overflow: ${({ isOverflow }) => isOverflow && 'auto'};
`;

export interface EditorProps extends Theming {
  state?: ReturnType<typeof useNavigationState>['menuState'];
  readonly?: boolean;
  placeholder?: string;
  schema: PassedSchema;
  sidebarExpanded?: boolean;
  diffSchemas?: Record<string, string>;
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
  theme,
  sidebarExpanded,
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
    libraryTree,
    setTree,
    setSnapshots,
    setUndos,
    setLibraryTree,
    setReadonly,
    schemaType,
    generateTreeFromSchema,
    selectedNode,
    setSelectedNode,
    readonly,
  } = useTreesState();
  const { isSortAlphabetically, sortByTypes, orderTypes, isUserOrder } =
    useSortState();
  const { setSidebarSize, sidebarSize } = useLayoutState();
  const { routes } = useRouter();
  const selectedNodeFromQuery = routes.n;
  const reset = () => {
    setSnapshots([]);
    setUndos([]);
    setGrafErrors(undefined);
  };
  useEffect(() => {
    if (selectedNodeFromQuery === selectedNode?.field?.name || tree.initial) {
      return;
    }
    const field = tree.nodes
      .concat(libraryTree.nodes)
      .find((n) => n.name === selectedNodeFromQuery);
    setSelectedNode(
      field
        ? {
            source: 'routing',
            field,
          }
        : undefined,
    );
  }, [tree, libraryTree]);

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
      GraphQLEditorWorker.generateTree(schema.libraries).then(setLibraryTree);
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
      GraphQLEditorWorker.generateCode(tree).then((graphql) => {
        if (graphql !== schema.code || (grafErrors?.length || 0) > 0) {
          GraphQLEditorWorker.validate(graphql, schema.libraries).then(
            (errors) => {
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
            },
          );
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
        toggleCode={menuState.code === 'on'}
        sidebarExpanded={sidebarExpanded}
        setToggleCode={(e) =>
          setMenuState({
            ...menuState,
            code: menuState.code === 'off' ? 'on' : 'off',
          })
        }
        activePane={menuState.pane}
        excludePanes={diffSchemas ? undefined : ['diff']}
        setActivePane={(p) => {
          const newState: typeof menuState = { ...menuState, pane: p };
          setMenuState(newState);
          if (onStateChange) {
            onStateChange(newState);
          }
        }}
      />
      {menuState.code === 'on' && menuState.pane !== 'diff' && (
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
        <ErrorOuterContainer isOverflow>
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
      {menuState.pane === 'diff' && diffSchemas && (
        <DiffEditor schemas={diffSchemas} />
      )}
    </Main>
  );
};
