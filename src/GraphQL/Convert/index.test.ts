import { ParserField, Value } from 'graphql-zeus';
import { ConvertStringToObject } from '.';

describe('Convertion of string to nodes test', () => {
  it('Converts empty object properly', () => {
    const v = '{}';
    const result = ConvertStringToObject(v);
    const expected: ParserField[] = [
      {
        name: 'ObjectValue',
        args: [],
        data: { type: Value.ObjectValue },
        type: { name: 'ObjectValue' },
      },
    ];
    expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
  });
  it('Converts array of empty objects properly', () => {
    const v = '[{},{}]';
    const result = ConvertStringToObject(v);
    const expected: ParserField[] = [
      {
        name: 'ObjectValue',
        args: [],
        data: { type: Value.ObjectValue },
        type: { name: 'ObjectValue' },
      },
      {
        name: 'ObjectValue',
        args: [],
        data: { type: Value.ObjectValue },
        type: { name: 'ObjectValue' },
      },
    ];
    expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
  });
});
