import { NumberNode } from "graphql-editor-worker";
import { manageDomNode } from "@/shared/hooks/manageDomNode";
import { ReactZoomPanPinchState } from "react-zoom-pan-pinch";
import { useRef } from "react";
import { DOMClassNames } from "@/shared/hooks/DOMClassNames";

export const useDomManagerTs = (parent: "focus" | "all") => {
  let parentClass = parent;

  const DOMGraphNode = manageDomNode(DOMClassNames.node, parentClass);
  const DOMGraphConnection = manageDomNode(
    DOMClassNames.nodeConnection,
    parentClass
  );
  const DOMNavigationNode = manageDomNode(DOMClassNames.navigationTitle);
  const visibleNodesCache = useRef<string[]>();
  const lodCache = useRef<"far">();

  const selectNode = (nodeId: string) => {
    deselectNodes();
    DOMGraphNode.addClassToAll("selection");
    DOMGraphConnection.addClassToAll("selection");
    DOMNavigationNode.addClassByFn("active", (e) => {
      const htmlElem = e as HTMLDivElement;
      const m = htmlElem.dataset.id === nodeId;
      if (m) {
        htmlElem.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return m;
    });
    DOMGraphConnection.addClassByFn("active", (e) => {
      const svgElem = e as SVGGElement;
      return (
        svgElem.dataset["from"] === nodeId || svgElem.dataset["to"] === nodeId
      );
    });
    DOMGraphNode.addClassByFn("active", (e) => {
      return e.id === `node-${nodeId}`;
    });
  };
  const deselectNodes = () => {
    DOMGraphNode.removeClasses(["active", "selection", "related"]);
    DOMGraphConnection.removeClasses(["active", "selection"]);
    DOMNavigationNode.removeClasses(["active"]);
  };
  const markRelated = (relatedNodeIdsToSelected: string[]) => {
    DOMGraphNode.addClassByFn("related", (e) => {
      return relatedNodeIdsToSelected.map((r) => `node-${r}`).includes(e.id);
    });
  };
  const markInViewport = (nodesInViewport: string[]) => {
    const mappedNodes = nodesInViewport.map((r) => `node-${r}`);
    DOMGraphConnection.toggleClassByFn("inViewport", (e) => {
      const svgElem = e as SVGGElement;
      return !!(
        (svgElem.dataset["from"] &&
          nodesInViewport.includes(svgElem.dataset["from"])) ||
        (svgElem.dataset["to"] &&
          nodesInViewport.includes(svgElem.dataset["to"]))
      );
    });
    DOMGraphNode.toggleClassByFn("inViewport", (e) => {
      return mappedNodes.includes(e.id);
    });
  };
  const cullNodes = (
    nodes: NumberNode[],
    state: ReactZoomPanPinchState,
    size: DOMRect,
    extraAreaPercentage = 0.0
  ) => {
    const pan = {
      x: state.positionX / state.scale,
      y: state.positionY / state.scale,
      scale: state.scale,
    };
    const viewport = {
      w: size.width / state.scale,
      h: size.height / state.scale,
    };
    const bb = {
      x: [-pan.x, -pan.x + viewport.w * (1 + extraAreaPercentage)],
      y: [-pan.y, -pan.y + viewport.h * (1 + extraAreaPercentage)],
    };
    const activeNodes = nodes
      .filter((node) => {
        const n = {
          ...node,
          x: node.x - node.width / 2.0,
          y: node.y - node.height / 2.0,
        };
        const x =
          (n.x < bb.x[1] && n.x > bb.x[0]) ||
          (n.x + n.width > bb.x[0] && n.x + n.width < bb.x[1]) ||
          (n.x < bb.x[0] && n.x + n.width > bb.x[1]);
        const y =
          (n.y < bb.y[1] && n.y > bb.y[0]) ||
          (n.y + n.height > bb.y[0] && n.y + n.height < bb.y[1]) ||
          (n.y < bb.y[0] && n.y + n.height > bb.y[1]);
        return x && y;
      })
      .map((n) => n.id);
    const refValue = visibleNodesCache.current;
    if (refValue && JSON.stringify(refValue) === JSON.stringify(activeNodes)) {
      return;
    }
    visibleNodesCache.current = activeNodes;
    markInViewport(activeNodes);
  };
  const LoDNodes = (scale: number) => {
    if (scale < 0.66) {
      if (lodCache.current === "far") return;
      DOMGraphNode.addClassToAll("far");
      lodCache.current = "far";
    } else {
      if (!lodCache.current) return;
      DOMGraphNode.removeClasses(["far"]);
      lodCache.current = undefined;
    }
  };
  const changeZoomInTopBar = (scale: number) => {
    const topBarZoomSpan = document.querySelector(
      `.${parentClass} .${DOMClassNames.topBarZoom}`
    );
    if (topBarZoomSpan) {
      topBarZoomSpan.innerHTML = `${(scale * 100).toFixed() + "%"}`;
    }
  };
  return {
    lodCache,
    selectNode,
    deselectNodes,
    markRelated,
    cullNodes,
    LoDNodes,
    changeZoomInTopBar,
    changeParentClass: (parent: "focus" | "all") => (parentClass = parent),
  };
};
