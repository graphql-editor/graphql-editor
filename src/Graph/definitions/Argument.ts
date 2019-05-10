import { EditorNodeDefinition, Options } from '../../Models';
import { Instances } from '../../Models/Spec';
import { help } from '../help';

export const ArgumentInstance: Partial<EditorNodeDefinition> &
  Pick<EditorNodeDefinition, 'node'> = {
  node: {
    notEditable: true,
    name: undefined
  },
  data: {
    type: Instances.Argument
  },
  options: [
    {
      name: Options.array,
      help: help.array
    }
  ]
};
