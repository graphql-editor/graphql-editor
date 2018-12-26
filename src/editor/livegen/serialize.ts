import { LinkType } from '@slothking-online/diagram';
import { nodeTypes, SubTypes } from '../nodeTypes';
import { GraphQLNodeType, utils } from './code-generators';
import { TemplateProps } from './code-generators/graphql/template';
import { crudMacroTemplate } from './code-generators/graphql/macros';
export const regenerateNodes = (nodes: GraphQLNodeType[], links: LinkType[]) => {
  let nodeInputs: TemplateProps[] = nodes
    .filter((n) => n.subType === SubTypes.definition)
    .map((n) => ({
      node: n,
      inputs: utils.getDefinitionInputs(links, nodes, n),
      outputs: utils.getDefinitionOutputs(links, nodes, n)
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
