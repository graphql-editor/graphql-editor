import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { ParserField } from 'graphql-js-tree';
import { Lines, RelationPath } from './Lines';
import { useRelationsState, useTreesState } from '@/state/containers';
import { compareNodesWithData } from '@/compare/compareNodes';

let tRefs: Record<string, HTMLDivElement> = {};

export const RelationNode = () => {
  const { selectedNode } = useTreesState();
  const { currentNodes, refsLoaded, refs } = useRelationsState();

  const [relations, setRelations] =
    useState<{ to: RelationPath; from: RelationPath[] }[]>();

  const [relationDrawingNodes, setRelationDrawingNodes] = useState<
    ParserField[]
  >([]);

  useEffect(() => {
    if (selectedNode?.field?.name) {
      const relatedNodes = currentNodes.filter(
        (n) =>
          n.args?.find((a) => a.type.name === selectedNode.field?.name) ||
          compareNodesWithData(n, selectedNode.field) ||
          selectedNode.field?.args?.find((a) => a.type.name === n.name),
      );
      setRelationDrawingNodes(relatedNodes);
      return;
    }
  }, [selectedNode]);

  useLayoutEffect(() => {
    if (refsLoaded) {
      setRelations(
        relationDrawingNodes
          .map((n) => ({
            to: { htmlNode: refs[n.name + n.data.type], field: n },
            from: n.args
              ?.map((a, index) => {
                const pn = relationDrawingNodes.find(
                  (nf) => nf.name === a.type.name,
                );
                if (!pn) {
                  return;
                }
                return {
                  htmlNode: refs[pn.name + pn.data.type],
                  field: pn,
                  index,
                } as RelationPath;
              })
              .filter((o) => !!o),
          }))
          .filter((n) => n.from)
          .map((n) => n as { from: RelationPath[]; to: RelationPath }),
      );
    }
  }, [refs, relationDrawingNodes, currentNodes, refsLoaded]);

  const SvgLinesContainer = useMemo(() => {
    return <Lines relations={relations} selectedNode={selectedNode?.field} />;
  }, [relations, selectedNode]);

  useEffect(() => {
    if (selectedNode?.field?.name) {
      const scrollToRef = (): unknown => {
        if (selectedNode?.field?.name) {
          const ref =
            tRefs[selectedNode.field.name + selectedNode.field.data.type];
          if (!ref) {
            return setTimeout(scrollToRef, 10);
          }
          ref.scrollIntoView({
            block: 'center',
            inline: 'center',
            behavior: 'smooth',
          });
        }
      };
      scrollToRef();
    }
  }, [selectedNode]);
  return SvgLinesContainer;
};
