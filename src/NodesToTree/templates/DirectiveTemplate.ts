import { ParserField } from 'graphql-zeus';
import { TemplateUtils } from './TemplateUtils';

/**
 * Template for directives
 *
 * @export
 * @class DirectiveTemplate
 */
export class DirectiveTemplate {
  /**
   * Resolve directive field
   *
   * @static
   * @param f parser field
   * @returns
   * @memberof DirectiveTemplate
   */
  static resolve(f: ParserField) {
    let argsString = '';
    if (f.args && f.args.length) {
      argsString = `(\n${f.args
        .map(TemplateUtils.resolverForConnection)
        .map((a) => `\t${a}`)
        .join('\n')}\n)`;
    }
    return `${TemplateUtils.descriptionResolver(f.description)}@${f.type.name}${argsString}`;
  }
}
