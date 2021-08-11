export const tree = {
    "tree": {
        "editor": "tree-editor",
        "elements": {
            "CodePane": {
                "name": "tree-elements-CodePane-name",
                "textField": "tree-elements-CodePane-textField",
                "synchronize": "tree-elements-CodePane-synchronize"
            },
            "Graf": {
                "name": "tree-elements-Graf-name",
                "categoryName": "tree-elements-Graf-categoryName",
                "searchInput": "tree-elements-Graf-searchInput",
                "newNode": "tree-elements-Graf-newNode",
                "nodes": "tree-elements-Graf-nodes",
                "PaintNode": "tree-elements-Graf-PaintNode",
                "ActiveNode": {
                    "name": "tree-elements-Graf-ActiveNode-name",
                    "description": "tree-elements-Graf-ActiveNode-description",
                    "title": "tree-elements-Graf-ActiveNode-title",
                    "type": "tree-elements-Graf-ActiveNode-type",
                    "ActiveField": {
                        "name": "tree-elements-Graf-ActiveNode-ActiveField-name",
                        "editableName": "tree-elements-Graf-ActiveNode-ActiveField-editableName",
                        "type": "tree-elements-Graf-ActiveNode-ActiveField-type",
                        "editableDefaultValue": "tree-elements-Graf-ActiveNode-ActiveField-editableDefaultValue",
                        "editableArgumentName": "tree-elements-Graf-ActiveNode-ActiveField-editableArgumentName",
                        "Menus": {
                            "ExpandInput": "tree-elements-Graf-ActiveNode-ActiveField-Menus-ExpandInput",
                            "ExpandOutput": "tree-elements-Graf-ActiveNode-ActiveField-Menus-ExpandOutput",
                            "ChangeType": {
                                "button": "tree-elements-Graf-ActiveNode-ActiveField-Menus-ChangeType-button",
                                "menu": {
                                    "title": "tree-elements-Graf-ActiveNode-ActiveField-Menus-ChangeType-menu-title",
                                    "searchInput": "tree-elements-Graf-ActiveNode-ActiveField-Menus-ChangeType-menu-searchInput",
                                    "optionToSelect": "tree-elements-Graf-ActiveNode-ActiveField-Menus-ChangeType-menu-optionToSelect"
                                }
                            },
                            "Options": {
                                "button": "tree-elements-Graf-ActiveNode-ActiveField-Menus-Options-button",
                                "menu": {
                                    "delete": "tree-elements-Graf-ActiveNode-ActiveField-Menus-Options-menu-delete"
                                }
                            },
                            "Required": {
                                "button": "tree-elements-Graf-ActiveNode-ActiveField-Menus-Required-button",
                                "menu": {
                                    "required": "tree-elements-Graf-ActiveNode-ActiveField-Menus-Required-menu-required",
                                    "array": "tree-elements-Graf-ActiveNode-ActiveField-Menus-Required-menu-array",
                                    "arrayRequired": "tree-elements-Graf-ActiveNode-ActiveField-Menus-Required-menu-arrayRequired"
                                }
                            }
                        }
                    },
                    "TopNodeMenu": {
                        "searchableMenu": {
                            "title": "tree-elements-Graf-ActiveNode-TopNodeMenu-searchableMenu-title",
                            "searchInput": "tree-elements-Graf-ActiveNode-TopNodeMenu-searchableMenu-searchInput",
                            "optionToSelect": "tree-elements-Graf-ActiveNode-TopNodeMenu-searchableMenu-optionToSelect"
                        },
                        "CreateField": "tree-elements-Graf-ActiveNode-TopNodeMenu-CreateField",
                        "Implement": "tree-elements-Graf-ActiveNode-TopNodeMenu-Implement",
                        "Directive": "tree-elements-Graf-ActiveNode-TopNodeMenu-Directive",
                        "Operations": "tree-elements-Graf-ActiveNode-TopNodeMenu-Operations",
                        "Options": "tree-elements-Graf-ActiveNode-TopNodeMenu-Options"
                    }
                }
            },
            "Hierarchy": {
                "name": "tree-elements-Hierarchy-name",
                "canvas": "tree-elements-Hierarchy-canvas"
            },
            "DiffEditor": {
                "name": "tree-elements-DiffEditor-name",
                "oldPane": "tree-elements-DiffEditor-oldPane",
                "newPane": "tree-elements-DiffEditor-newPane"
            },
            "Relation": {
                "name": "tree-elements-Relation-name"
            }
        },
        "sidebar": {
            "name": "tree-sidebar-name",
            "menu": {
                "name": "tree-sidebar-menu-name",
                "children": {
                    "diagram": "tree-sidebar-menu-children-diagram",
                    "codeDiagram": "tree-sidebar-menu-children-codeDiagram",
                    "code": "tree-sidebar-menu-children-code",
                    "hierarchy": "tree-sidebar-menu-children-hierarchy",
                    "diff": "tree-sidebar-menu-children-diff",
                    "relation": "tree-sidebar-menu-children-relation"
                }
            }
        }
    }
} as const
