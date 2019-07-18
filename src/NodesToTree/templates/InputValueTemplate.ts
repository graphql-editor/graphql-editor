import { Options, ParserField } from 'graphql-zeus';
import { TemplateUtils } from './TemplateUtils';

export class InputValueTemplate {
  static resolve(f: ParserField) {
    let argsString = '';
    if (f.args && f.args.length) {
      if (f.type.options && f.type.options.includes(Options.array)) {
        argsString = ` = [${f.args.map(TemplateUtils.resolverForConnection).join(',\n')}]`;
      } else {
        argsString = ` = ${f.args.map(TemplateUtils.resolverForConnection).join('\n')}`;
      }
    }
    return `${TemplateUtils.descriptionResolver(f.description, `\t`)}\t${
      f.name
    } : ${TemplateUtils.resolveType(f)}${argsString}${TemplateUtils.resolveDirectives(
      f.directives
    )}`;
  }
}
