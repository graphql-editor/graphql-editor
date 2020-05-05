import { typeInEditor, Action } from './Action';
import * as schemas from './schema';
import { cypressGet, GraphQLEditorCypress } from '../../src/cypress_constants';
describe('tests for diagram from code generation', () => {
  it('should display schema inside diagram after typing code after blur', () => {
    cy.visit('/');
    typeInEditor(schemas.builtInDirectives.replace(/\t/g, '').replace(/\}/g, ''));
    cy.wait(100);
    Action.click(cypressGet(GraphQLEditorCypress, 'diagram', 'name'));
  });
  it('shouldnt display error schema inside diagram after typing code after blur', () => {
    cy.visit('/');
    typeInEditor(schemas.errorSchema.replace(/\t/g, '').replace(/\}/g, ''));
    cy.wait(100);
    Action.click(cypressGet(GraphQLEditorCypress, 'diagram', 'name'));
  });
});
