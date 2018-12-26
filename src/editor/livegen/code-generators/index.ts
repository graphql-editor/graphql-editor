import { NodeType } from '@slothking-online/diagram';
import { SubTypes, allTypes } from '../../nodeTypes';

export type AllTypes = { [x in allTypes]?: string };
export type Transforms = {
  input?: AllTypes;
  context?: AllTypes;
  output?: AllTypes;
};
export type Requester = { [x in allTypes]?: Transforms };

export type TransformedInput = GraphQLNodeType & {
  array?: boolean;
  arrayRequired?: boolean;
  args?: TransformedInput[];
};

export interface GraphQLNodeType extends NodeType {
  subType: keyof typeof SubTypes;
  type: allTypes;
}
import * as faker from './faker';
import * as frontend from './frontend';
import * as graphql from './graphql';
import * as nodes from './nodes';
import * as utils from './utils';
export { faker, frontend, graphql, nodes, utils };
