import { ParserField } from '../../Models';
import { TemplateUtils } from './TemplateUtils';

export class DirectiveTemplate {
  static resolve(f: ParserField) {
    let argsString = '';
    if (f.args && f.args.length) {
      argsString = `(\n${f.args.map(TemplateUtils.resolverForConnection).join('\n')}\n)`;
    }
    return `${TemplateUtils.descriptionResolver(f.description)}@${f.type.name}${argsString}`;
  }
}
