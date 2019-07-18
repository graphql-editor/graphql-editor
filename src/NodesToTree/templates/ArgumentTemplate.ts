import { Options, ParserField } from 'graphql-zeus';
import { TemplateUtils } from './TemplateUtils';

/**
 * resolve function argument
 *
 * @export
 * @class ArgumentTemplate
 */
export class ArgumentTemplate {
  static resolve(f: ParserField) {
    let argsString = '';
    if (f.args && f.args.length) {
      if (f.type.options && f.type.options!.includes(Options.array)) {
        argsString = `[${f.args.map(TemplateUtils.resolverForConnection).join(',\n')}]`;
      } else {
        argsString = `${f.args.map(TemplateUtils.resolverForConnection).join('\n')}`;
      }
    }
    return `${f.type.name} : ${argsString}`;
  }
}
