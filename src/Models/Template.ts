export interface BaseField {
  name: string;
  type: string;
  array?: boolean;
  required?: boolean;
  arrayRequired?: boolean;
}

export interface GraphQLTemplateField extends BaseField {
  description?: string;
  args?: BaseField[];
}

export interface GraphQLTemplateObject {
  name: string;
  type: string;
  description?: string;
  interfaces?: string[];
  fields?: GraphQLTemplateField[];
}
