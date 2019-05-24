import { Options } from './Options';
import { Directive, OperationType } from './Spec';
import { GraphQLNodeParams } from './Types';

export interface ParserField {
  name: string;
  type: {
    name: string;
    options?: Options[];
    operations?: OperationType[];
    directiveOptions?: Directive[];
  };
  data?: GraphQLNodeParams;
  args?: ParserField[];
  interfaces?: string[];
  directives?: ParserField[];
  description?: string;
}

export interface ParserTree {
  nodes: ParserField[];
}
