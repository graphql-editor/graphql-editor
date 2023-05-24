export const DOMClassNames = {
  active: "active",
  node: "graph-node",
  nodeConnection: "graph-connection",
  nodeTitle: "graph-node-title",
  navigationTitle: "navigation-title",
  navigationTitleSpan: "navigation-title-span",
  navigationSelectedActions: "navigation-selectedActions",
  nodeFields: "graph-node-fields",
  nodeSelection: "selection",
  nodeInViewport: "inViewport",
  nodeField: "graph-field",
  topBarZoom: "zoom-percentage",
} as const;

export const DOMEvents = {
  selectNode: {
    trigger: (id?: string) => {
      document.dispatchEvent(
        new CustomEvent<{ id?: string }>("selectnode", { detail: { id } })
      );
    },
    disposable: (fn: (id?: string) => void) => {
      const listener = (e: CustomEvent<{ id?: string }>) => {
        fn(e.detail.id);
      };
      document.addEventListener("selectnode", listener as any);
      return {
        dispose: () =>
          document.removeEventListener("selectnode", listener as any),
      };
    },
  },
};
