import { PanZoom } from "@/Relation/PanZoom/PanZoom";
import {
  useRelationNodesState,
  useRelationsState,
  useTreesState,
} from "@/state/containers";
import React, { useMemo, useState } from "react";
import { TransformWrapper } from "react-zoom-pan-pinch";
import { Graf } from "@/Graf/Graf";
import styled from "@emotion/styled";
import { AnimatePresence } from "framer-motion";
import { BackgroundFTUX } from "@/Relation/FTUX/BackgroundFTUX";
import { useRouter } from "@/state/containers/router";
import { ImportSchema } from "@/shared/dialogs/ImportSchema";

export const Relation: React.FC<{
  setInitialSchema: (s: string) => void;
  schema: string;
  title?: React.ReactNode;
}> = ({ setInitialSchema, title, schema }) => {
  const { activeNode, focusMode, allNodes } = useTreesState();
  const {
    filteredFocusedNodes,
    filteredRelationNodes,
    filteredTypeRelatedToFocusedNode,
  } = useRelationNodesState();
  const { editMode, ctrlToZoom } = useRelationsState();
  const { set, routes } = useRouter();
  const [popupsState, setPopupsState] = useState({
    import: false,
  });
  const isFocus = !!(focusMode && filteredFocusedNodes);
  const nodesToShow = useMemo(() => {
    return [
      ...(filteredFocusedNodes || []),
      ...filteredTypeRelatedToFocusedNode,
    ];
  }, [filteredFocusedNodes, filteredTypeRelatedToFocusedNode]);
  const viewport = useMemo(() => {
    return (
      <>
        <TransformWrapper
          initialScale={1}
          disabled={isFocus}
          maxScale={1.5}
          wheel={{
            activationKeys: ctrlToZoom ? ["Control", "OS", "Meta"] : [],
            step: 0.03,
          }}
          minScale={0.1}
          limitToBounds={false}
          zoomAnimation={{ disabled: true }}
        >
          <PanZoom
            hide={isFocus}
            parentClass="all"
            nodes={filteredRelationNodes}
            title={title}
          />
        </TransformWrapper>
      </>
    );
  }, [filteredRelationNodes, isFocus, ctrlToZoom]);

  return (
    <RelationContainer>
      {allNodes.nodes.length ? (
        <>
          {viewport}
          {isFocus && (
            <FocusOverlay>
              <TransformWrapper
                initialScale={1}
                maxScale={1.5}
                wheel={{
                  activationKeys: ctrlToZoom ? ["Control", "OS", "Meta"] : [],
                  step: 0.03,
                }}
                panning={{ velocityDisabled: false }}
                minScale={0.1}
                limitToBounds={false}
                zoomAnimation={{ disabled: true }}
              >
                <PanZoom
                  title={title}
                  parentClass="focus"
                  nodes={nodesToShow}
                />
              </TransformWrapper>
            </FocusOverlay>
          )}
          <AnimatePresence>
            {!!editMode && activeNode && <Graf node={activeNode} />}
          </AnimatePresence>
        </>
      ) : (
        <AnimatePresence>
          <BackgroundFTUX
            showCode={routes.code === "off"}
            onStartCoding={() => {
              set(
                {
                  ...routes,
                  code: routes.code === "off" ? "on" : "off",
                  source: "internal",
                },
                "internal"
              );
            }}
            onImport={() => {
              setPopupsState({ import: true });
            }}
            schema={schema}
          />
        </AnimatePresence>
      )}
      <ImportSchema
        onClose={() => setPopupsState({ import: false })}
        onImport={(s) => {
          setInitialSchema(s);
        }}
        open={popupsState.import}
      />
    </RelationContainer>
  );
};
const RelationContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: ${({ theme }) => theme.neutrals.L6};
`;

const FocusOverlay = styled.div`
  z-index: 2;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;
