import { ParserField, Value } from 'graphql-zeus';
import { TemplateUtils } from './TemplateUtils';

export class ValueTemplate {
  static resolve(f: ParserField) {
    let returnedValue = `${f.name}`;
    if (f.data && f.data.type) {
      if (f.data.type === Value.EnumValue) {
        returnedValue = `${f.type.name}`;
      }
      if (f.data.type === Value.StringValue) {
        returnedValue = `"${f.name}"`;
      }
      if (f.data.type === Value.ObjectValue) {
        returnedValue = `{${(f.args || []).map(TemplateUtils.resolverForConnection)}}`;
      }
    }
    return returnedValue;
  }
}
