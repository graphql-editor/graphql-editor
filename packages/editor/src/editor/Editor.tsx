import React, { useEffect } from 'react';
import { Menu } from './menu/Menu';
import { CodePane } from './code';
import { PassedSchema } from '@/Models';
import { DynamicResize } from './code/Components';
import { ParserTree } from 'graphql-js-tree';
import { GraphQLEditorWorker } from 'graphql-editor-worker';
import {
  useErrorsState,
  useTreesState,
  useTheme,
  useLayoutState,
} from '@/state/containers';

import { DiffEditor } from '@/DiffEditor';
import { Relation } from '@/Relation/Relation';
import { EditorTheme } from '@/gshared/theme/DarkTheme';
import { Docs } from '@/Docs/Docs';
import { useSortState } from '@/state/containers/sort';
import styled from '@emotion/styled';
import { useRouter, EditorRoutes } from '@/state/containers/router';
import { ErrorsList } from '@/shared/errors/ErrorsList';
import { NodeNavigation } from '@/shared/NodeNavigation';

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
  overflow-y: ${({ isOverflow }) => isOverflow && 'auto'};
  overflow-x: hidden;
`;

export interface EditorProps {
  // Code in editor is readonly
  readonly?: boolean;
  // Code and libraries
  schema: PassedSchema;
  // force expand/hide sidebar
  sidebarExpanded?: boolean;
  // Record containing graphql schemas with "name" as a key and graphql schema as a "value"
  diffSchemas?: Record<string, string>;
  // Function to be called when schema is set by the editor
  setSchema: (props: PassedSchema, isInvalid?: boolean) => void;
  // Function that could be fired if tree changes
  onTreeChange?: (tree: ParserTree) => void;
  // Editor theme
  theme?: EditorTheme;
  // Override current route
  routeState?: EditorRoutes;
  // listen to route changes. Don't bind it with routeState though! You will get Maximum depth exceeded
  onRouteChange?: (r: EditorRoutes) => void;
}

export const Editor = ({
  schema = {
    code: '',
    libraries: '',
  },
  setSchema,
  diffSchemas,
  onTreeChange,
  readonly: editorReadOnly,
  theme,
  sidebarExpanded,
  routeState,
  onRouteChange,
}: EditorProps) => {
  const { setTheme } = useTheme();
  const {
    grafErrors,
    setGrafErrors,
    setLockCode,
    setGrafEditorErrors,
    setGrafErrorSchema,
    lockGraf,
    errorsItems,
  } = useErrorsState();
  const {
    tree,
    allNodes,
    setTree,
    setSnapshots,
    setUndos,
    setLibraryTree,
    setReadonly,
    generateTreeFromSchema,
    selectedNodeId,
    setSelectedNodeId,
    readonly,
  } = useTreesState();
  const { isSortAlphabetically, sortByTypes, orderTypes, isUserOrder } =
    useSortState();
  const { setSidebarSize, sidebarSize } = useLayoutState();
  const { routes, set } = useRouter();

  const reset = () => {
    setSnapshots([]);
    setUndos([]);
    setGrafErrors(undefined);
  };
  useEffect(() => {
    if (routes.source === 'internal') return;
    if (!routes.n) {
      setSelectedNodeId(undefined);
      return;
    }
    const field = allNodes.nodes.find((n) => n.id === routes.n);

    setSelectedNodeId({
      source: 'routing',
      value: field
        ? {
            id: field.id,
            name: field.name,
          }
        : undefined,
    });
  }, [allNodes, routes.n]);

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
    setReadonly(!!editorReadOnly);
  }, [editorReadOnly]);

  useEffect(() => {
    if (schema.libraries) {
      GraphQLEditorWorker.generateTree(schema.libraries).then(setLibraryTree);
    } else {
      setLibraryTree({ nodes: [] });
    }
    reset();
  }, [schema.libraries]);

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

  useEffect(() => {
    if (tree.initial || selectedNodeId?.source === 'routing') {
      return;
    }
    set(
      {
        n: selectedNodeId?.value?.id,
      },
      'internal',
    );
  }, [selectedNodeId]);

  useEffect(() => {
    if (routeState) {
      set({ ...routeState });
    }
  }, [routeState?.code, routeState?.n, routeState?.pane]);

  useEffect(() => {
    if (onRouteChange && routes.source === 'internal') {
      onRouteChange({
        ...routes,
      });
    }
  }, [routes.code, routes.pane, routes.n]);

  return (
    <Main
      onKeyDown={(e) => {
        if (e.key.toLowerCase() === 'f' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
        }
      }}
    >
      <Menu
        toggleCode={routes.code === 'on'}
        sidebarExpanded={sidebarExpanded}
        setToggleCode={(e) =>
          set(
            {
              ...routes,
              code: routes.code === 'off' ? 'on' : 'off',
              source: 'internal',
            },
            'internal',
          )
        }
        activePane={routes.pane}
        excludePanes={diffSchemas ? undefined : ['diff']}
        setActivePane={(p) => {
          const newState: typeof routes = { ...routes, pane: p };
          set(newState, 'internal');
        }}
      />
      {routes.code === 'on' && routes.pane !== 'diff' && (
        <DynamicResize
          enable={{ right: true }}
          disabledClass={!routes.pane ? 'full-screen-container' : undefined}
          resizeCallback={(e, r, c, w) => {
            setSidebarSize(c.getBoundingClientRect().width);
          }}
          width={!routes.pane ? '100%' : sidebarSize}
        >
          <Sidebar
            className={!routes.pane ? 'full-screen-container' : undefined}
          >
            <CodePane
              size={!routes.pane ? 100000 : sidebarSize}
              onChange={(v) => {
                setSchema({ ...schema, code: v, isTree: false });
              }}
              schema={schema.code}
              fullScreen={!routes.pane}
              libraries={schema.libraries}
              readonly={readonly}
            />
          </Sidebar>
        </DynamicResize>
      )}
      {(routes.pane === 'relation' || routes.pane === 'docs') && (
        <ErrorOuterContainer>
          {routes.pane === 'relation' && <Relation />}
          {routes.pane === 'docs' && <Docs />}
          <NodeNavigation />
        </ErrorOuterContainer>
      )}
      {routes.pane === 'diff' && diffSchemas && (
        <DiffEditor schemas={diffSchemas} />
      )}
      {lockGraf && <ErrorsList> {errorsItems}</ErrorsList>}
    </Main>
  );
};
