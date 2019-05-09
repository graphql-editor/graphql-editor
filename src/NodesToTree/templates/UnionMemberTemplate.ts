import { ParserField } from '../../Models';

export class UnionMemberTemplate {
  static resolve(f: ParserField) {
    return f.type.name;
  }
}
