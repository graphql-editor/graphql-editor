import { typeInEditor, Action } from './Action';
import { cypressGet, GraphQLEditorCypress } from '../../src/cypress_constants';
describe('testss for diagram from code generation', () => {
  it('can open code', () => {
    cy.visit('/');
    Action.click(cypressGet(GraphQLEditorCypress, 'sidebar', 'menu', 'children', 'code', 'name'));
    Action.contains(cypressGet(GraphQLEditorCypress, 'sidebar', 'code', 'name')).then(($el) => {
      Cypress.dom.isVisible($el); // true
    });
  });
  it('can open diagram', () => {
    cy.visit('/');
    Action.click(cypressGet(GraphQLEditorCypress, 'sidebar', 'menu', 'children', 'diagram', 'name'));
    Action.contains(cypressGet(GraphQLEditorCypress, 'diagram', 'name')).then(($el) => {
      Cypress.dom.isVisible($el); // true
    });
  });
  it('can open explorer', () => {
    cy.visit('/');
    Action.click(cypressGet(GraphQLEditorCypress, 'sidebar', 'menu', 'children', 'explorer', 'name'));
    Action.contains(cypressGet(GraphQLEditorCypress, 'sidebar', 'explorer', 'name')).then(($el) => {
      Cypress.dom.isVisible($el); // true
    });
  });
  it('can open both diagram and code', () => {
    cy.visit('/');
    Action.click(cypressGet(GraphQLEditorCypress, 'sidebar', 'menu', 'children', 'codeDiagram', 'name'));
    Action.contains(cypressGet(GraphQLEditorCypress, 'sidebar', 'code', 'name')).then(($el) => {
      Cypress.dom.isVisible($el); // true
    });
    Action.contains(cypressGet(GraphQLEditorCypress, 'diagram', 'name')).then(($el) => {
      Cypress.dom.isVisible($el); // true
    });
  });
});
