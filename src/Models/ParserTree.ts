import { Options } from './Options';
import { GraphQLNodeParams, Operations } from './Types';

export interface ParserField {
  name: string;
  type: {
    name: string;
    options?: Options[];
  };
  nodeParams?: GraphQLNodeParams;
  args?: ParserField[];
  description?: string;
}

export interface ParserRoot {
  name: string;
  type: {
    name: string;
    options?: Operations[];
  };
  fields?: ParserField[];
  interfaces?: string[];
  description?: string;
}

export interface ParserTree {
  nodes: ParserRoot[];
}
