import { Options } from './Options';

export interface ParserField {
  name: string;
  type: {
    name: string;
    options?: Options[];
  };
  args?: ParserField[];
  description?: string;
}

export interface ParserRoot {
  name: string;
  type: string;
  fields: ParserField[] | null;
  description?: string;
}

export interface ParserTree {
  nodes: ParserRoot[];
}
