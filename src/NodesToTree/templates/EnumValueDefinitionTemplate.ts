import { ParserField } from '../../Models';
import { TemplateUtils } from './TemplateUtils';

export class EnumValueDefinitionTemplate {
  static resolve(f: ParserField) {
    return `${TemplateUtils.descriptionResolver(f.description, `\t`)}\t${
      f.name
    }${TemplateUtils.resolveDirectives(f.directives)}`;
  }
}
