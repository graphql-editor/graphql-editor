import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { sizeSidebar, fontFamily } from '@/vars';
import { Menu, ActivePane } from './Menu';
import { CodePane } from './code';

import { GraphQLEditorCypress, cypressGet } from '@/cypress_constants';
import { PassedSchema, Theming } from '@/Models';
import { DynamicResize } from './code/Components';
import { Graf } from '@/Graf/Graf';
import { Hierarchy } from '@/Hierarchy';
import { Parser, TreeToGraphQL } from 'graphql-zeus';
import { Workers } from '@/worker';
import { style } from 'typestyle';
import { useTreesState } from '@/state/containers/trees';
import { useErrorsState, useNavigationState, useTheme } from '@/state/containers';

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
export const ErrorContainer = style({
  position: 'absolute',
  zIndex: 2,
  top: 0,
  right: 0,
  width: `calc(100% - 40px)`,
  padding: 20,
  margin: 20,
  borderRadius: 4,
  fontSize: 12,
  fontFamily,
  letterSpacing: 1,
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
});

export interface EditorProps extends Theming {
  activePane?: ActivePane;
  readonly?: boolean;
  placeholder?: string;
  schema: PassedSchema;
  onPaneChange?: (pane: ActivePane) => void;
  setSchema: (props: PassedSchema) => void;
}

let stopCodeFromTreeGeneration = false;
let stopTreeFromCodeGeneration = false;
let isTreeInitial = true;

export const Editor = ({
  readonly,
  placeholder,
  schema = {
    code: '',
    libraries: '',
  },
  initialSizeOfSidebar = sizeSidebar,
  activePane = 'diagram',
  onPaneChange,
  setSchema,
}: EditorProps) => {
  const [sidebarSize, setSidebarSize] = useState<string | number>(initialSizeOfSidebar);
  const { menuState, setMenuState } = useNavigationState();
  const { grafErrors, setGrafErrors, setLockGraf, setCodeErrors } = useErrorsState();
  const { themed } = useTheme();

  const { tree, setSnapshots, setUndos, setTree, setLibraryTree, setReadonly } = useTreesState();

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
          if (errors.length > 0) {
            setGrafErrors([...new Set(errors.map((e) => e.text))].join('\n\n'));
            return;
          }
          setGrafErrors(undefined);
          setSchema({ ...schema, code: graphql });
        });
      }
    } catch (error) {
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
              !excludeLibraryNodesFromDiagram.nodes.find((eln) => eln.name === n.name && eln.data.type === n.data.type),
          ),
        });
      } else {
        setTree(Parser.parse(schema.code));
      }
    } catch (error) {
      // TODO: Catch the error and dispaly
      Workers.validate(schema.code, schema.libraries).then((errors) => {
        setCodeErrors(errors);
        setLockGraf(!!errors.length);
      });
    }
  };

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
    if (stopTreeFromCodeGeneration) {
      stopTreeFromCodeGeneration = false;
      return;
    }
    stopCodeFromTreeGeneration = true;
    generateTreeFromSchema();
  }, [schema.code]);
  useEffect(() => {
    console.log(tree, isTreeInitial);
    if (isTreeInitial) {
      isTreeInitial = false;
      return;
    }
    if (stopCodeFromTreeGeneration) {
      stopCodeFromTreeGeneration = false;
      return;
    }
    stopTreeFromCodeGeneration = true;
    generateSchemaFromTree();
  }, [tree]);

  return (
    <div
      data-cy={cypressGet(GraphQLEditorCypress, 'name')}
      className={Main}
      onKeyDown={(e) => {
        if (e.key.toLowerCase() === 'f' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
        }
      }}
    >
      <Menu
        activePane={menuState}
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
            className={cx(themed('Sidebar')(Sidebar), {
              [FullScreenContainer]: menuState === 'code',
            })}
            data-cy={cypressGet(GraphQLEditorCypress, 'sidebar', 'name')}
          >
            {(menuState === 'code' || menuState === 'code-diagram') && (
              <CodePane
                size={menuState === 'code' ? 100000 : sidebarSize}
                onChange={(v) => setSchema({ ...schema, code: v })}
                schema={schema.code}
                libraries={schema.libraries}
                placeholder={placeholder}
                readonly={readonly}
              />
            )}
          </div>
        </DynamicResize>
      )}
      {(menuState === 'diagram' || menuState === 'code-diagram') && (
        <div className={ErrorOuterContainer}>
          {grafErrors && <div className={themed('ErrorContainer')(ErrorContainer)}>{grafErrors}</div>}
          <Graf />
        </div>
      )}
      {menuState === 'hierarchy' && <Hierarchy />}
    </div>
  );
};
