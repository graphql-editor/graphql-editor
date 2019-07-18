import { ParserField } from 'graphql-zeus';
import { TemplateUtils } from './TemplateUtils';

/**
 * Template for enum value defintion
 *
 * @export
 * @class EnumValueDefinitionTemplate
 */
export class EnumValueDefinitionTemplate {
  /**
   * Resolve field to enum value definiton
   *
   * @static
   * @param {ParserField} f
   * @returns
   * @memberof EnumValueDefinitionTemplate
   */
  static resolve(f: ParserField) {
    return `${TemplateUtils.descriptionResolver(f.description, `\t`)}\t${
      f.name
    }${TemplateUtils.resolveDirectives(f.directives)}`;
  }
}
