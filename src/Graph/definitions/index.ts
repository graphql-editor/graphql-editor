import { Node } from 'graphsource';
import { GraphQLNodeParams } from '../../Models';
import { HelperDefinitions } from './HelperDefintions';
import { ScalarDefinitions } from './ScalarDefintions';
import { TypeDefinitions } from './TypeDefintions';
import { ValueDefinitions } from './ValueDefinitions';

export class Definitions {
  static generate(stitchNodes: Array<Node<GraphQLNodeParams>>) {
    const definitions = [];
    definitions.push(...HelperDefinitions.generate());
    definitions.push(...TypeDefinitions.generate(stitchNodes));
    definitions.push(...ScalarDefinitions.generate());
    definitions.push(...ValueDefinitions.generate(stitchNodes));
    return definitions;
  }
}
