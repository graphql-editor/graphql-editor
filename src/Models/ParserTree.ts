import { Options } from './Options';
import { Directive, GraphQLNodeParams, Operations } from './Types';

export interface ParserField {
  name: string;
  type: {
    name: string;
    options?: Options[];
  };
  nodeParams?: GraphQLNodeParams;
  args?: ParserField[];
  directives?: ParserField[];
  description?: string;
}

export interface ParserRoot {
  name: string;
  type: {
    name: string;
    options?: Operations[];
    directiveOptions?: Directive[];
  };
  fields?: ParserField[];
  interfaces?: string[];
  directives?: ParserField[];
  description?: string;
}

export interface ParserTree {
  nodes: ParserRoot[];
}
