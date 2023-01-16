import React, { useEffect } from 'react';
import { GraphQLEditorWorker } from 'graphql-editor-worker';
import { useErrorsState, useTheme, useTreesState } from '@/state/containers';
import { EditorTheme } from '@/gshared/theme/DarkTheme';
import styled from '@emotion/styled';
import { ErrorsList } from '@/shared/errors/ErrorsList';
import { PassedSchema } from '@/Models';
import { NodeNavigation } from '@/shared/NodeNavigation';
import { Relation } from '@/EmbeddedEditor/Relation';

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

const ErrorOuterContainer = styled.div<{ isOverflow?: boolean }>`
  width: 100%;
  position: relative;
  display: flex;
  overflow-y: ${({ isOverflow }) => isOverflow && 'auto'};
  overflow-x: hidden;
`;

export interface EmbeddedEditorProps {
  schema: PassedSchema;
  theme?: EditorTheme;
}

export const EmbeddedEditor = ({ schema, theme }: EmbeddedEditorProps) => {
  const { setTheme } = useTheme();
  const { generateTreeFromSchema, tree } = useTreesState();
  const {
    grafErrors,
    setGrafErrors,
    setLockCode,
    setGrafEditorErrors,
    setGrafErrorSchema,
    lockGraf,
    errorsItems,
  } = useErrorsState();

  useEffect(() => {
    if (theme) {
      setTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    if (schema.isTree) {
      return;
    }
    generateTreeFromSchema(schema);
  }, [schema]);

  useEffect(() => {
    try {
      GraphQLEditorWorker.generateCode(tree).then((graphql) => {
        if ((grafErrors?.length || 0) > 0) {
          GraphQLEditorWorker.validate(graphql).then((errors) => {
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
          });
        }
      });
    } catch (error) {
      const msg = (error as any).message;
      setLockCode(msg);
      setGrafErrors(msg);
      return;
    }
  }, [tree]);

  return (
    <Main
      onKeyDown={(e) => {
        if (e.key.toLowerCase() === 'f' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
        }
      }}
    >
      <ErrorOuterContainer>
        <Relation />
        <NodeNavigation />
      </ErrorOuterContainer>
      {lockGraf && <ErrorsList> {errorsItems}</ErrorsList>}
    </Main>
  );
};
