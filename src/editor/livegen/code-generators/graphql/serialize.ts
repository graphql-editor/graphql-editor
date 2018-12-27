import { GraphQLNodeType } from '../';
import {
  TemplateProps,
  templates,
  rootQueryTemplate,
  rootMutationTemplate,
  rootSubscriptionTemplate
} from './template';
import { nodeTypes } from '../../../nodeTypes';
import { NodeType, LinkType } from '@slothking-online/diagram';
import { regenerateNodes } from '../../serialize';
export const serializeSchema = (
  node: NodeType[],
  links: LinkType[],
  tabs: string[]
): {
  code: string;
  nodes: GraphQLNodeType[];
  links: LinkType[];
} => {
  const nodes = [...node] as GraphQLNodeType[];
  const nodeInputs: TemplateProps[] = regenerateNodes(nodes, links);
  const generator = (
    type: keyof typeof nodeTypes,
    template: (props: TemplateProps) => string,
    joinString = '\n\n'
  ) =>
    nodeInputs
      .filter((n) => n.node.type === type)
      .map(template)
      .join(joinString);
  const queriesCode = rootQueryTemplate(generator(nodeTypes.Query, templates.Query, '\n'));
  const mutationsCode = rootMutationTemplate(
    generator(nodeTypes.Mutation, templates.Mutation, '\n')
  );
  const subscriptionsCode = rootSubscriptionTemplate(
    generator(nodeTypes.Subscription, templates.Subscription, '\n')
  );
  let mainCode = 'schema{';
  if (queriesCode) {
    mainCode += '\n\tquery: Query';
  }
  if (mutationsCode) {
    mainCode += '\n\tmutation: Mutation';
  }
  if (subscriptionsCode) {
    mainCode += '\n\tsubscription: Subscription';
  }
  mainCode += '\n}';
  if (!queriesCode && !mutationsCode && !subscriptionsCode) {
    mainCode = '';
  }
  let code = [
    nodeTypes.scalar,
    nodeTypes.enum,
    nodeTypes.interface,
    nodeTypes.type,
    nodeTypes.input,
    nodeTypes.union
  ]
    .map((n) => generator(nodeTypes[n], templates[nodeTypes[n]]))
    .filter((c) => c.length > 0)
    .join('\n\n');
  if (mainCode) {
    code = code
      .concat('\n\n')
      .concat(
        [queriesCode, mutationsCode, subscriptionsCode].filter((c) => c.length > 0).join('\n\n')
      )
      .concat('\n\n')
      .concat(mainCode);
  }
  return {
    code,
    nodes,
    links
  };
};
