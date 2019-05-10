import { HelperDefinitions } from './HelperDefintions';
import { ScalarDefinitions } from './ScalarDefintions';
import { TypeDefinitions } from './TypeDefintions';
import { ValueDefinitions } from './ValueDefinitions';

export class Definitions {
  static generate() {
    const definitions = [];
    definitions.push(...HelperDefinitions.generate());
    definitions.push(...TypeDefinitions.generate());
    definitions.push(...ScalarDefinitions.generate());
    definitions.push(...ValueDefinitions.generate());
    return definitions;
  }
}
