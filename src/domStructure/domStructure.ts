export const tree = {
  tree: {
    editor: 'tree-editor',
    elements: {
      CodePane: {
        name: 'tree-elements-CodePane-name',
        textField: 'tree-elements-CodePane-textField',
        synchronize: 'tree-elements-CodePane-synchronize',
      },
      Graf: {
        categoryName: 'tree-elements-Graf-categoryName',
        searchInput: 'tree-elements-Graf-searchInput',
        nodes: 'tree-elements-Graf-nodes',
        PaintNode: 'tree-elements-Graf-PaintNode',
        ActiveNode: {
          description: 'tree-elements-Graf-ActiveNode-description',
          title: 'tree-elements-Graf-ActiveNode-title',
          type: 'tree-elements-Graf-ActiveNode-type',
          ActiveField: {
            name: 'tree-elements-Graf-ActiveNode-ActiveField-name',
            editableName: 'tree-elements-Graf-ActiveNode-ActiveField-editableName',
            type: 'tree-elements-Graf-ActiveNode-ActiveField-type',
            editableDefaultValue: 'tree-elements-Graf-ActiveNode-ActiveField-editableDefaultValue',
            editableArgumentName: 'tree-elements-Graf-ActiveNode-ActiveField-editableArgumentName',
            Menus: {
              ExpandInput: 'tree-elements-Graf-ActiveNode-ActiveField-Menus-ExpandInput',
              ExpandOutput: 'tree-elements-Graf-ActiveNode-ActiveField-Menus-ExpandOutput',
              ChangeType: {
                button: 'tree-elements-Graf-ActiveNode-ActiveField-Menus-ChangeType-button',
                menu: {
                  title: 'tree-elements-Graf-ActiveNode-ActiveField-Menus-ChangeType-menu-title',
                  searchInput: 'tree-elements-Graf-ActiveNode-ActiveField-Menus-ChangeType-menu-searchInput',
                  optionToSelect: 'tree-elements-Graf-ActiveNode-ActiveField-Menus-ChangeType-menu-optionToSelect',
                },
              },
              Options: {
                button: 'tree-elements-Graf-ActiveNode-ActiveField-Menus-Options-button',
                menu: {
                  delete: 'tree-elements-Graf-ActiveNode-ActiveField-Menus-Options-menu-delete',
                },
              },
              Required: {
                button: 'tree-elements-Graf-ActiveNode-ActiveField-Menus-Required-button',
                menu: {
                  required: 'tree-elements-Graf-ActiveNode-ActiveField-Menus-Required-menu-required',
                  array: 'tree-elements-Graf-ActiveNode-ActiveField-Menus-Required-menu-array',
                  arrayRequired: 'tree-elements-Graf-ActiveNode-ActiveField-Menus-Required-menu-arrayRequired',
                },
              },
            },
          },
          TopNodeMenu: {
            CreateField: {
              button: 'tree-elements-Graf-ActiveNode-TopNodeMenu-CreateField-button',
              menu: {
                title: 'tree-elements-Graf-ActiveNode-TopNodeMenu-CreateField-menu-title',
                searchInput: 'tree-elements-Graf-ActiveNode-TopNodeMenu-CreateField-menu-searchInput',
                optionToSelect: 'tree-elements-Graf-ActiveNode-TopNodeMenu-CreateField-menu-optionToSelect',
              },
            },
            Implement: {
              button: 'tree-elements-Graf-ActiveNode-TopNodeMenu-Implement-button',
              menu: {
                title: 'tree-elements-Graf-ActiveNode-TopNodeMenu-Implement-menu-title',
                searchInput: 'tree-elements-Graf-ActiveNode-TopNodeMenu-Implement-menu-searchInput',
                optionToSelect: 'tree-elements-Graf-ActiveNode-TopNodeMenu-Implement-menu-optionToSelect',
              },
            },
            Directive: {
              button: 'tree-elements-Graf-ActiveNode-TopNodeMenu-Directive-button',
              menu: {
                title: 'tree-elements-Graf-ActiveNode-TopNodeMenu-Directive-menu-title',
                searchInput: 'tree-elements-Graf-ActiveNode-TopNodeMenu-Directive-menu-searchInput',
                optionToSelect: 'tree-elements-Graf-ActiveNode-TopNodeMenu-Directive-menu-optionToSelect',
              },
            },
            Operations: {
              button: 'tree-elements-Graf-ActiveNode-TopNodeMenu-Operations-button',
              menu: {
                query: 'tree-elements-Graf-ActiveNode-TopNodeMenu-Operations-menu-query',
                mutation: 'tree-elements-Graf-ActiveNode-TopNodeMenu-Operations-menu-mutation',
                subscription: 'tree-elements-Graf-ActiveNode-TopNodeMenu-Operations-menu-subscription',
              },
            },
            Options: {
              button: 'tree-elements-Graf-ActiveNode-TopNodeMenu-Options-button',
              menu: {
                duplicate: 'tree-elements-Graf-ActiveNode-TopNodeMenu-Options-menu-duplicate',
                delete: 'tree-elements-Graf-ActiveNode-TopNodeMenu-Options-menu-delete',
              },
            },
          },
        },
      },
      Hierarchy: {
        name: 'tree-elements-Hierarchy-name',
        canvas: 'tree-elements-Hierarchy-canvas',
      },
    },
    sidebar: {
      name: 'tree-sidebar-name',
      menu: {
        name: 'tree-sidebar-menu-name',
        children: {
          diagram: 'tree-sidebar-menu-children-diagram',
          codeDiagram: 'tree-sidebar-menu-children-codeDiagram',
          code: 'tree-sidebar-menu-children-code',
          hierarchy: 'tree-sidebar-menu-children-hierarchy',
        },
      },
    },
  },
} as const;
