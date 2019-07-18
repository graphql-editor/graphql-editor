import { ParserField } from 'graphql-zeus';

export class UnionMemberTemplate {
  static resolve(f: ParserField) {
    return f.type.name;
  }
}
