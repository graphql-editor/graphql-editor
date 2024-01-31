export const DataIds = {
  new: "new",
  filter: "filter",
  relationsOnly: "relations-only",
  libraryNodes: "library-nodes",
  export: "export",
  shuffle: "shuffle",
  zoom: "zoom",
  defocus: "defocus",
  search: "search",
  menuCode: "menu-code",
  menuRelations: "menu-relations",
  menuDocs: "menu-docs",
  menuExport: "menu-export",
  menuImport: "menu-import",
  menuDiff: "menu-diff",
  navigation: "navigation",
  graphNode: "graph-node",
} as const;

export const dataIt = (d: keyof typeof DataIds) => {
  return {
    "data-id": DataIds[d],
  };
};
