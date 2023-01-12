import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { fontFamily, fontFamilySans } from '@/vars';
import { useTreesState } from '@/state/containers/trees';
import { useErrorsState, useRelationsState } from '@/state/containers';
import { Toggle } from '@/shared/components';
import styled from '@emotion/styled';
import { toPng } from 'html-to-image';
import { Clear, Export, Eye } from '@/editor/icons';
import * as vars from '@/vars';
import { TopBar } from '@/shared/components/TopBar';
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from '@pronestor/react-zoom-pan-pinch';
import { Minus, Plus } from '@/shared/icons';
import { TypeDefinition } from 'graphql-js-tree';
import { LinesDiagram } from '@/Relation/LinesDiagram';
import { Graf } from '@/Graf/Graf';
import { NewNode } from '@/shared/components/NewNode';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  width: 100%;
  overflow: hidden;
  transition: ${vars.transition};
  background: ${({ theme }) => theme.background.mainFurther};
`;

const ErrorContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  width: calc(100% - 40px);
  padding: 20px;
  margin: 20px;
  border-radius: 4px;
  font-size: 12px;
  font-family: ${fontFamily};
  letter-spacing: 1;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.background.mainFurther};
  border: 1px solid ${({ theme }) => theme.error};
`;

const DeselectWrapper = styled.div`
  padding-left: 12px;
  border-left: 1px solid ${({ theme }) => theme.disabled}36;
`;

const TooltippedZoom = styled.div`
  position: relative;
  font-size: 14px;
  font-weight: 500;
  background: transparent;
  width: 3rem;
  border: 0;
  text-align: center;
  color: ${({ theme }) => theme.inactive};
  font-family: ${fontFamilySans};
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  &[data-tooltip] {
    &:after {
      content: attr(data-tooltip);
      position: absolute;
      pointer-events: none;
      top: 44px;
      right: 0px;
      width: max-content;
      color: ${({ theme }) => theme.text};
      font-weight: 400;
      background: #000000;
      border: 1px solid ${({ theme }) => theme.dimmed};
      text-align: center;
      padding: 5px 12px;
      z-index: 100;
      opacity: 0;
      transition: opacity 0.25s ease-in-out;
    }

    &:hover {
      &:after {
        opacity: 1;
        color: #e3f6fc;
      }
    }
  }
`;
const IconWrapper = styled.div`
  position: relative;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.inactive};
  font-family: ${fontFamilySans};
  cursor: pointer;
  display: flex;
  user-select: none;
  transition: ${vars.transition};
  :hover {
    color: ${({ theme }) => theme.text};
  }

  &[data-tooltip] {
    &:after {
      content: attr(data-tooltip);
      position: absolute;
      pointer-events: none;
      top: 44px;
      right: 0px;
      width: max-content;
      color: ${({ theme }) => theme.text};
      font-weight: 400;
      background: #000000;
      border: 1px solid ${({ theme }) => theme.dimmed};
      text-align: center;
      padding: 5px 12px;
      z-index: 100;
      opacity: 0;
      transition: opacity 0.25s ease-in-out;
    }

    &:hover {
      &:after {
        opacity: 1;
        color: #e3f6fc;
      }
    }
  }
`;

const TogglesWrapper = styled.div`
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.background.mainCloser};
  border-radius: 2px;
  gap: 1rem;
`;
const ZoomWrapper = styled.div`
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.background.mainFurthers};
  border-color: ${({ theme }) => theme.background.mainCloser};
  border-style: solid;
  border-width: 1px;
  border-radius: 2px;
  gap: 1rem;
`;

const Menu = styled.div`
  display: flex;
  font-family: ${fontFamilySans};
  gap: 12px;
  align-items: center;
  position: relative;
  justify-content: flex-end;
`;

type DragMode = 'grab' | 'auto' | 'grabbing';

const Main = styled.div<{ dragMode: DragMode }>`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  font-family: ${fontFamily};
  justify-content: flex-end;
  cursor: ${({ dragMode }) => dragMode};
`;

export const Relation: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { selectedNode, allNodes, setSelectedNode, readonly } = useTreesState();
  const { grafErrors } = useErrorsState();
  const {
    setBaseTypesOn,
    baseTypesOn,
    setEnumsOn,
    enumsOn,
    editMode,
    setEditMode,
  } = useRelationsState();

  const [isLoading, setIsLoading] = useState(false);
  const [draggingMode, setDraggingMode] = useState<DragMode>('grab');
  const [scaleFactor, setScaleFactor] = useState('100');
  const ref = useRef<ReactZoomPanPinchRef>(null);

  useEffect(() => {
    if (!selectedNode) setScaleFactor('100');
  }, [selectedNode]);

  const downloadPng = useCallback(() => {
    setIsLoading(true);
    if (mainRef.current === null) {
      return;
    }
    toPng(mainRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${'relation_view'}`;
        link.href = dataUrl;
        link.click();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [mainRef]);
  const zoomPanPinch = (refs: Record<string, HTMLElement>) => {
    if (selectedNode?.field && ref.current && refs) {
      const currentNode = refs[selectedNode.field.id];
      if (currentNode) {
        const bb = currentNode.getBoundingClientRect();
        if (bb.height > window.innerHeight / 1.2) {
          const currentScale = ref.current.state.scale;
          const newScaleFactor = window.innerHeight / 1.2 / bb.height;
          const newScale = Math.max(0.3, currentScale * newScaleFactor);
          ref.current.zoomToElement(
            currentNode as HTMLElement,
            newScale,
            300,
            'easeInOutQuad',
          );
          return;
        }
        ref.current.zoomToElement(
          currentNode,
          ref.current.state.scale,
          300,
          'easeInOutQuad',
        );
      }
    }
  };

  const doubleClickHandler = () => {
    setScaleFactor((prevState) =>
      Math.min(parseInt(prevState) + 70, 150).toFixed(),
    );
  };

  useEffect(() => {
    if (!wrapperRef.current) return;
    wrapperRef.current.addEventListener('dblclick', doubleClickHandler);

    return () => {
      if (!wrapperRef.current) return;
      return wrapperRef.current.removeEventListener(
        'dblclick',
        doubleClickHandler,
      );
    };
  }, []);

  const typeNodes = useMemo(() => {
    console.log('TYPE NODES');
    return allNodes.nodes.filter(
      (n) =>
        n.data.type === TypeDefinition.ObjectTypeDefinition ||
        n.data.type === TypeDefinition.UnionTypeDefinition ||
        n.data.type === TypeDefinition.InterfaceTypeDefinition,
    );
  }, [allNodes]);
  const singleNodes = useMemo(() => {
    return allNodes.nodes.filter(
      (n) =>
        n.data.type === TypeDefinition.InputObjectTypeDefinition ||
        n.data.type === TypeDefinition.ScalarTypeDefinition ||
        n.data.type === TypeDefinition.EnumTypeDefinition,
    );
  }, [allNodes]);
  singleNodes;
  const step = 0.2;
  return (
    <Wrapper>
      <TopBar>
        <Menu>
          {selectedNode?.field && (
            <IconWrapper
              data-tooltip="Focus selected node"
              onClick={(_e) => setSelectedNode({ ...selectedNode })}
            >
              <Eye size={22} />
            </IconWrapper>
          )}
          {selectedNode?.field && (
            <DeselectWrapper>
              <IconWrapper
                data-tooltip="Deselect node"
                onClick={(_e) => setSelectedNode(undefined)}
              >
                <Clear size={16} />
              </IconWrapper>
            </DeselectWrapper>
          )}
          {!selectedNode?.field && !readonly && <NewNode />}
          <ZoomWrapper>
            <IconWrapper
              data-tooltip="Zoom out"
              onClick={() => {
                setScaleFactor((prevState) =>
                  Math.max(parseInt(prevState) - step * 100, 30).toFixed(),
                );
                ref.current?.zoomOut(step);
              }}
            >
              <Minus width={16} height={16} />
            </IconWrapper>
            <TooltippedZoom data-tooltip="Ctrl/Cmd + Scroll to zoom in/out">
              <span>{scaleFactor + '%'}</span>
            </TooltippedZoom>
            <IconWrapper
              data-tooltip="Zoom in"
              onClick={() => {
                ref.current?.zoomIn(step);
                setScaleFactor((prevState) =>
                  Math.min(parseInt(prevState) + step * 100, 150).toFixed(),
                );
              }}
            >
              <Plus width={16} height={16} />
            </IconWrapper>
          </ZoomWrapper>
          <TogglesWrapper>
            <Toggle
              toggled={editMode}
              label="edit mode"
              onToggle={() => setEditMode(!editMode)}
            />
            <Toggle
              toggled={baseTypesOn}
              label="scalars"
              onToggle={() => setBaseTypesOn(!baseTypesOn)}
            />
            <Toggle
              toggled={enumsOn}
              label="enums"
              onToggle={() => setEnumsOn(!enumsOn)}
            />
          </TogglesWrapper>
          {isLoading ? (
            <IconWrapper data-tooltip="Loading...">...</IconWrapper>
          ) : (
            <IconWrapper
              data-tooltip="Export to png"
              onClick={() => downloadPng()}
            >
              <Export size={22} />
            </IconWrapper>
          )}
        </Menu>
      </TopBar>
      <Main
        dragMode={selectedNode?.field ? draggingMode : 'auto'}
        ref={wrapperRef}
      >
        {editMode && selectedNode?.field && <Graf node={selectedNode.field} />}
        <TransformWrapper
          ref={ref}
          wheel={{ activationKeys: ['Control'] }}
          initialScale={1}
          maxScale={1.5}
          minScale={0.3}
          limitToBounds={false}
          onZoom={(e) => {
            setScaleFactor((Math.max(e.state.scale, 0.3) * 100).toFixed());
          }}
          panning={{
            velocityDisabled: true,
          }}
          onPanningStart={() => setDraggingMode('grab')}
          onPanning={() => setDraggingMode('grabbing')}
          onPanningStop={() => setTimeout(() => setDraggingMode('auto'), 1)}
        >
          <Deselect
            onMouseUp={(e) => {
              if (draggingMode !== 'grabbing') {
                setSelectedNode({ source: 'relation', field: undefined });
              }
            }}
          >
            <TransformComponent
              wrapperStyle={{
                flex: 1,
                height: '100%',
              }}
            >
              <LinesDiagram
                zoomPanPinch={zoomPanPinch}
                panState={draggingMode}
                nodes={typeNodes}
                mainRef={mainRef}
              />
            </TransformComponent>
          </Deselect>
        </TransformWrapper>
        {grafErrors && <ErrorContainer>{grafErrors}</ErrorContainer>}
      </Main>
    </Wrapper>
  );
};
const Deselect = styled.div`
  height: 100%;
  width: 100%;
`;
