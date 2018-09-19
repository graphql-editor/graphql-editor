import { TransformedInput, GraphQLNodeType } from '../..';
import { LinkType } from '@slothking-online/diagram';
import { inputTemplate } from '../template';
import { argumentTypes, SubTypes, Macros } from '../../../../nodeTypes';
import { getDefinitionInputs, find } from '../../utils';

const IDInputGenerate: TransformedInput = {
  name: argumentTypes.ID,
  type: argumentTypes.ID,
  inputs: [],
  outputs: [],
  subType: SubTypes.field
};

export const crudMacroTemplate = (nodes: GraphQLNodeType[], links: LinkType[]): string =>
  find(nodes, Macros.crud)
    .map((n) => getDefinitionInputs(links, nodes, n))
    .map((inputs) =>
      inputs
        .map((i) => {
          const node = nodes.find((n) => n.id === i.clone);
          const createInputCode = inputTemplate(
            {
              ...node,
              name: `${node.name}CreateInput`
            },
            getDefinitionInputs(links, nodes, node)
          );
          const updateInputCode = inputTemplate(
            {
              ...node,
              name: `${node.name}UpdateInput`
            },
            getDefinitionInputs(links, nodes, node).concat([IDInputGenerate])
          );
          const deleteInputCode = inputTemplate(
            {
              ...node,
              name: `${node.name}DeleteInput`
            },
            [IDInputGenerate]
          );
          const readInputCode = inputTemplate(
            {
              ...node,
              name: `${node.name}DeleteInput`
            },
            [IDInputGenerate]
          );
          return [createInputCode, updateInputCode, deleteInputCode, readInputCode].join('\n');
        })
        .join('\n')
    )
    .join('\n');
