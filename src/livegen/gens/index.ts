import { NodeType } from '@slothking-online/diagram';
import { SubTypes, allTypes } from '../../nodeTypes';

export type AllTypes = { [x in allTypes]?: string };
export type Transforms = {
  input?: AllTypes;
  context?: AllTypes;
  output?: AllTypes;
};
export type Requester = { [x in allTypes]?: Transforms };

export type TransformedInput = Pick<
  GraphQLNodeType,
  'subType' | 'type' | 'kind' | 'name' | 'required'
> & {
  array?: boolean;
  args?: TransformedInput[];
};

export interface GraphQLNodeType extends NodeType {
  subType: keyof typeof SubTypes;
  type: allTypes;
}
