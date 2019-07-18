import { ParserField } from 'graphql-zeus';

/**
 * Template for union member represented in GraphQL Union - `type U = A | B` where A and B are union members
 *
 * @export
 * @class UnionMemberTemplate
 */
export class UnionMemberTemplate {
  static resolve(f: ParserField) {
    return f.type.name;
  }
}
