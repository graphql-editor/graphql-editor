import { GraphQLNodeType } from './gens';
import { TemplateProps } from './gens/graphql/template';
import { getDefinitionInputs, getDefinitionOutputs } from './gens/utils';
import { SubTypes, nodeTypes } from '../nodeTypes';
import { crudMacroTemplate } from './gens/graphql/macros/crud';
import { LinkType } from '@slothking-online/diagram';
import { serializeSchema } from './gens/graphql/serialize';
import { serializeFrontend } from './gens/frontend/serialize';
export const regenerateNodes = (nodes: GraphQLNodeType[], links: LinkType[]) => {
  let nodeInputs: TemplateProps[] = nodes
    .filter((n) => n.subType === SubTypes.definition)
    .map((n) => ({
      node: n,
      inputs: getDefinitionInputs(links, nodes, n),
      outputs: getDefinitionOutputs(links, nodes, n)
    }));
  nodeInputs = nodeInputs.map(
    (n) =>
      n.node.type === nodeTypes.type
        ? {
            ...n,
            inputs: [
              ...n.inputs,
              ...n.inputs
                .filter((ni) => ni.type === nodeTypes.implements)
                .map(
                  (interfaceTypeInput) =>
                    nodeInputs.find((ni) => ni.node.id === interfaceTypeInput.clone).inputs
                )
                .reduce((a, b) => [...a, ...b], [])
            ]
          }
        : n
  );
  return crudMacroTemplate(nodes, links, nodeInputs);
};

export const serialize = {
  graphql: {
    fn: serializeSchema
  },
  typescript: {
    fn: serializeFrontend
  }
};
