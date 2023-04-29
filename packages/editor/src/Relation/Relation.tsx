import { PanZoom } from '@/Relation/PanZoom/PanZoom';
import {
  useErrorsState,
  useRelationNodesState,
  useRelationsState,
  useTreesState,
} from '@/state/containers';
import React, { useMemo } from 'react';
import { TransformWrapper } from 'react-zoom-pan-pinch';
import { Graf } from '@/Graf/Graf';
import styled from '@emotion/styled';
import { Chip } from '@aexol-studio/styling-system';

export const Relation: React.FC = () => {
  const { activeNode } = useTreesState();
  const { focusMode, filteredFocusedNodes, filteredRelationNodes } =
    useRelationNodesState();
  const { editMode } = useRelationsState();
  const { grafErrors } = useErrorsState();
  const isFocus = !!(focusMode && filteredFocusedNodes);
  const viewport = useMemo(() => {
    return (
      <>
        <TransformWrapper
          initialScale={1}
          maxScale={1.5}
          wheel={{ activationKeys: ['Control', 'OS', 'Meta'], step: 0.03 }}
          minScale={0.1}
          limitToBounds={false}
        >
          <PanZoom className="all" nodes={filteredRelationNodes} />
        </TransformWrapper>
      </>
    );
  }, [filteredRelationNodes]);
  return (
    <RelationContainer>
      {viewport}
      {isFocus && (
        <FocusOverlay>
          <TransformWrapper
            initialScale={1}
            maxScale={1.5}
            wheel={{ activationKeys: ['Control', 'OS', 'Meta'], step: 0.03 }}
            minScale={0.1}
            limitToBounds={false}
          >
            <PanZoom className="focused" nodes={filteredFocusedNodes} />
          </TransformWrapper>
        </FocusOverlay>
      )}
      {grafErrors && (
        <ErrorContainer>
          <Chip label={grafErrors} variant="warning" />
        </ErrorContainer>
      )}
      {!!editMode && activeNode && <Graf node={activeNode} />}
    </RelationContainer>
  );
};
const RelationContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const ErrorContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 1rem;
  z-index: 2;
`;
const FocusOverlay = styled.div`
  z-index: 2;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;
