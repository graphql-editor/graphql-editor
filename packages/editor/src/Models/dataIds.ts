export const DataIds = {
  search: "search",
  navigation: "navigation",
  sidebar: "sidebar-menu",
  //sidebar
  menuCode: "menu-code",
  menuFiles: "menu-files",
  menuRelations: "menu-relations",
  menuDocs: "menu-docs",
  menuExport: "menu-export",
  menuImport: "menu-import",
  menuDiff: "menu-diff",
  //Views
  diffView: "diff-view",
  codeView: "code-view",
  docsView: "docs-view",
  relationView: "relation-view",
  //relation
  graphNode: "graph-node",
  nodeFocus: "node-focus",
  nodeEditExpand: "node-edit-expand",
  defocus: "defocus",
  newNode: "newNode",
  filter: "filter",
  relationsOnly: "relations-only",
  libraryNodes: "library-nodes",
  export: "export",
  zoom: "zoom",
  //graf
  activeNode: "active-node",
  nodeDescription: "node-description",
  addField: "add-field",
  implementInterface: "implement-interface",
  addDirective: "add-directive",
  nodeOptions: "node-options",
  nodeField: "node-field",
  fieldName: "field-name",
  fieldType: "field-type",
  fieldList: "field-list",
  fieldExpand: "field-expand",
  fieldArgs: "field-args",
  fieldOptions: "field-options",
} as const;

export const dataIt = (d: keyof typeof DataIds) => {
  return {
    "data-id": DataIds[d],
  };
};
