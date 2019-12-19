import { Helpers, TypeExtension } from 'graphql-zeus';
import { EditorNodeDefinition } from '../../Models';
import { help } from './help';
import { Utils } from './Utils';

export const ExtensionInstance: (
  baseEditorNodeDefinition: EditorNodeDefinition,
  extensionType: TypeExtension,
) => Partial<EditorNodeDefinition> & Pick<EditorNodeDefinition, 'node'> = (
  { acceptsInputs, options },
  extensionType,
) => ({
  acceptsInputs,
  options,
  data: { type: extensionType, for: [Helpers.Extend] },
  instances: undefined,
  node: {
    ...Utils.createOND(),
    notEditable: true,
    name: undefined,
    outputs: [],
  },
  root: false,
});

export const ExtensionDefinition: EditorNodeDefinition = {
  type: Helpers.Extend,
  data: { type: Helpers.Extend },
  node: {
    ...Utils.createOND(),
    notEditable: true,
    name: undefined,
  },
  root: true,
  acceptsInputs: (d, defs, _) =>
    Utils.displayAsCategories(Utils.sortByParentType(Utils.dataForTypes(defs, [Helpers.Extend]))),
  help: help.extend,
};
