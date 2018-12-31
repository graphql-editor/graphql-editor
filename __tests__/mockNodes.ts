import { NodeType, LinkType } from '@slothking-online/diagram';

export const empty: {
  nodes: NodeType[];
  links: LinkType[];
  tabs?: string[];
} = {
  nodes: [],
  links: [],
  tabs: []
};
