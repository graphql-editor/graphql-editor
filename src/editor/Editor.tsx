import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { sizeSidebar } from '@/vars';
import { Menu, ActivePane } from './Menu';
import { CodePane } from './code';

import { PassedSchema, Theming } from '@/Models';
import { DynamicResize } from './code/Components';
import { Graf } from '@/Graf/Graf';
import { Hierarchy } from '@/Hierarchy';
import { Parser, TreeToGraphQL } from 'graphql-zeus';
import { Workers } from '@/worker';
import { style } from 'typestyle';
import { useTreesState } from '@/state/containers/trees';
import {
  useErrorsState,
  useNavigationState,
  useTheme,
} from '@/state/containers';
import { GraphQLEditorDomStructure } from '@/domStructure';
import { DiffEditor } from '@/DiffEditor';
import { Relation } from '@/Relation/Relation';
import { DarkTheme, EditorTheme } from '@/Theming/DarkTheme';

export const Main = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  height: '100%',
  width: '100%',
  alignItems: 'stretch',
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
  activePane?: ActivePane;
  readonly?: boolean;
  placeholder?: string;
  schema: PassedSchema;
  diffSchemas?: {
    oldSchema: PassedSchema;
    newSchema: PassedSchema;
  };
  onPaneChange?: (pane: ActivePane) => void;
  setSchema: (props: PassedSchema, isInvalid?: boolean) => void;
  theme?: EditorTheme;
}

let stopCodeFromTreeGeneration = false;
let stopTreeFromCodeGeneration = false;

export const Editor = ({
  readonly,
  placeholder,
  schema = {
    code: '',
    libraries: '',
  },
  initialSizeOfSidebar = sizeSidebar,
  activePane = 'code-diagram',
  onPaneChange,
  setSchema,
  diffSchemas,
  theme = DarkTheme,
}: EditorProps) => {
  const { theme: currentTheme, setTheme } = useTheme();
  const [sidebarSize, setSidebarSize] = useState<string | number>(
    initialSizeOfSidebar,
  );
  const { menuState, setMenuState } = useNavigationState();
  const {
    grafErrors,
    setGrafErrors,
    setLockGraf,
    setCodeErrors,
  } = useErrorsState();

  const {
    tree,
    setSnapshots,
    setUndos,
    setTree,
    setLibraryTree,
    setReadonly,
    isTreeInitial,
    setIsTreeInitial,
    selectedNode,
  } = useTreesState();

  const reset = () => {
    setSnapshots([]);
    setUndos([]);
    setGrafErrors(undefined);
  };

  const generateSchemaFromTree = () => {
    if (!tree) {
      return;
    }
    if (tree.nodes.length === 0) {
      if (schema.code !== '') {
        setSchema({
          ...schema,
          code: '',
        });
      }
      return;
    }
    try {
      const graphql = TreeToGraphQL.parse(tree);
      if (graphql !== schema.code || (grafErrors?.length || 0) > 0) {
        Workers.validate(graphql, schema.libraries).then((errors) => {
          console.log(errors);
          if (errors.length > 0) {
            setGrafErrors([...new Set(errors.map((e) => e.text))].join('\n\n'));
            return;
          }
          setGrafErrors(undefined);
          setSchema({ ...schema, code: graphql });
        });
      }
    } catch (error) {
      console.log(error);
      setGrafErrors(error.message);
      return;
    }
  };

  const generateTreeFromSchema = () => {
    if (!schema.code) {
      setTree({ nodes: [] });
      return;
    }
    try {
      if (schema.libraries) {
        const excludeLibraryNodesFromDiagram = Parser.parse(schema.libraries);
        const parsedResult = Parser.parse(schema.code, [], schema.libraries);
        setTree({
          nodes: parsedResult.nodes.filter(
            (n) =>
              !excludeLibraryNodesFromDiagram.nodes.find(
                (eln) => eln.name === n.name && eln.data.type === n.data.type,
              ),
          ),
        });
      } else {
        const parsedCode = Parser.parse(schema.code);
        setTree(parsedCode);
      }
      setLockGraf(false);
    } catch (error) {
      console.log(error);
      // TODO: Catch the error and dispaly
      Workers.validate(schema.code, schema.libraries).then((errors) => {
        setCodeErrors(errors);
        setLockGraf(!!errors.length);
      });
    }
  };

  useEffect(() => {
    if (theme) {
      setTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    setReadonly(!!readonly);
  }, [readonly]);

  useEffect(() => {
    if (schema.libraries) {
      setLibraryTree(Parser.parse(schema.libraries));
    } else {
      setLibraryTree({ nodes: [] });
    }
    reset();
  }, [schema.libraries]);

  useEffect(() => {
    setMenuState(activePane);
  }, [activePane]);

  useEffect(() => {
    if (stopCodeFromTreeGeneration) {
      stopCodeFromTreeGeneration = false;
      return;
    }
    stopTreeFromCodeGeneration = true;
    generateTreeFromSchema();
  }, [schema.code]);
  useEffect(() => {
    if (isTreeInitial) {
      setIsTreeInitial(false);
      return;
    }
    if (stopTreeFromCodeGeneration) {
      stopTreeFromCodeGeneration = false;
      return;
    }
    stopCodeFromTreeGeneration = true;
    generateSchemaFromTree();
  }, [tree]);

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
        activePane={menuState}
        excludePanes={diffSchemas ? undefined : ['diff']}
        setActivePane={(pane) => {
          setMenuState(pane);
          if (onPaneChange) {
            onPaneChange(pane);
          }
        }}
      />
      {(menuState === 'code' || menuState === 'code-diagram') && (
        <DynamicResize
          disabledClass={menuState === 'code' ? FullScreenContainer : undefined}
          resizeCallback={(e, r, c, w) => {
            setSidebarSize(c.getBoundingClientRect().width);
          }}
          width={menuState === 'code' ? '100%' : sidebarSize}
        >
          <div
            className={cx(Sidebar, {
              [FullScreenContainer]: menuState === 'code',
            })}
            data-cy={GraphQLEditorDomStructure.tree.sidebar.name}
            style={{
              background: currentTheme.colors.menu.background,
            }}
          >
            {(menuState === 'code' || menuState === 'code-diagram') && (
              <CodePane
                size={menuState === 'code' ? 100000 : sidebarSize}
                onChange={(v, isInvalid) => {
                  if (isInvalid) {
                    stopCodeFromTreeGeneration = true;
                    setLockGraf(true);
                  } else {
                    stopCodeFromTreeGeneration = false;
                  }
                  setSchema({ ...schema, code: v }, isInvalid);
                }}
                schema={schema.code}
                libraries={schema.libraries}
                placeholder={placeholder}
                readonly={readonly}
                scrollTo={
                  selectedNode &&
                  `${selectedNode.type.name} ${selectedNode.name}`
                }
              />
            )}
          </div>
        </DynamicResize>
      )}
      {(menuState === 'diagram' || menuState === 'code-diagram') && (
        <div className={ErrorOuterContainer}>
          <Graf />
        </div>
      )}
      {menuState === 'relation' && (
        <div className={ErrorOuterContainer}>
          <Relation />
        </div>
      )}
      {menuState === 'hierarchy' && <Hierarchy />}
      {menuState === 'diff' && diffSchemas && (
        <DiffEditor
          schema={diffSchemas.oldSchema.code}
          newSchema={diffSchemas.newSchema.code}
        />
      )}
    </div>
  );
};
