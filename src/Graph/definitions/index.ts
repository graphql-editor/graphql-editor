import { GraphQLNodeParams } from 'graphql-zeus';
import { Node } from 'graphsource';
import { ExtensionDefinition } from './Extension';
import { HelperDefinitions } from './HelperDefintions';
import { ScalarDefinitions } from './ScalarDefintions';
import { TypeDefinitions } from './TypeDefintions';
import { ValueDefinitions } from './ValueDefinitions';

/**
 * Class responsible for definitions generation aka `master`
 *
 * @export
 * @class Definitions
 */
export class Definitions {
  static generate(stitchNodes: Array<Node<GraphQLNodeParams>>) {
    const definitions = [];
    definitions.push(...HelperDefinitions.generate());
    definitions.push(...TypeDefinitions.generate(stitchNodes));
    definitions.push(...ScalarDefinitions.generate());
    definitions.push(...ValueDefinitions.generate(stitchNodes));
    definitions.push(ExtensionDefinition);
    return definitions;
  }
}
