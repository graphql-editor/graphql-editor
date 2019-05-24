import { ParserField } from '../Models';

const compareArrays = (a1: any[] = [], a2: any[] = []) =>
  a1.length === a2.length &&
  a1.sort().every((value, index) => {
    return value === a2.sort()[index];
  });

export class ParserUtils {
  static compareParserFields = (node1: ParserField, node2: ParserField): boolean => {
    if (
      node1.name !== node2.name ||
      node1.type.name !== node2.type.name ||
      !compareArrays(node1.type.directiveOptions, node2.type.directiveOptions) ||
      !compareArrays(node1.type.operations, node2.type.operations) ||
      !compareArrays(node1.type.options, node2.type.options) ||
      !compareArrays(node1.interfaces, node2.interfaces) ||
      !ParserUtils.compareParserTreesNodes(node1.directives, node2.directives) ||
      !ParserUtils.compareParserTreesNodes(node1.args, node2.args)
    ) {
      return false;
    }
    return true;
  }
  static compareParserTreesNodes = (
    t1: ParserField[] | undefined,
    t2: ParserField[] | undefined
  ): boolean => {
    if (!t1 && !t2) {
      return true;
    }
    if (!t1 && !!t2) {
      return false;
    }
    if (!!t1 && !t2) {
      return false;
    }
    for (const node1 of t1!) {
      const compareResult = t2!.find((node2) => ParserUtils.compareParserFields(node1, node2));
      if (!compareResult) {
        return false;
      }
    }
    return true;
  }
}
