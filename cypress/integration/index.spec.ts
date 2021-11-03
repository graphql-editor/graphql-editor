/// <reference types="cypress" />

import { GraphQLEditorDomStructure } from '@/domStructure';

context('Main Split IDE functions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1568/');
    cy.get(
      `[data-cy=${GraphQLEditorDomStructure.tree.sidebar.menu.children.diagram}]`,
    ).click();
  });
  it('Generates the Query in Graf after typing', () => {
    cy.wait(100);
    cy.get(`[data-cy=${GraphQLEditorDomStructure.tree.elements.CodePane.name}]`)
      .find('textarea')
      .focus()
      .type('type Query { name: String }', {
        force: true,
        parseSpecialCharSequences: false,
      })
      .blur();
    cy.get(
      `[data-cy=${GraphQLEditorDomStructure.tree.elements.Graf.PaintNode}]`,
    ).should('contain.text', 'Query');
  });
  it('Generates the Query in Code after creation with Graf', () => {
    cy.wait(100);
    cy.get(`[data-cy=${GraphQLEditorDomStructure.tree.elements.Graf.newNode}]`)
      .contains('type')
      .click();

    cy.get(`[data-cy=${GraphQLEditorDomStructure.tree.elements.Graf.newNode}]`)
      .find('input')
      .focus()
      .type('Query', {
        force: true,
        parseSpecialCharSequences: false,
      })
      .blur();
    cy.get(
      `[data-cy=${GraphQLEditorDomStructure.tree.elements.Graf.PaintNode}]`,
    ).should('contain.text', 'Query');

    cy.get(
      `[data-cy=${GraphQLEditorDomStructure.tree.elements.Graf.PaintNode}]`,
    )
      .contains('Query')
      .click();

    cy.get(
      `[data-cy=${GraphQLEditorDomStructure.tree.elements.Graf.ActiveNode.TopNodeMenu.CreateField}]`,
    ).click();
    cy.get(
      `[data-cy=${GraphQLEditorDomStructure.tree.elements.Graf.ActiveNode.TopNodeMenu.searchableMenu.searchInput}]`,
    )
      .find('input')
      .type('string', { force: true, parseSpecialCharSequences: false });
    cy.get(
      `[data-cy=${GraphQLEditorDomStructure.tree.elements.Graf.ActiveNode.TopNodeMenu.searchableMenu.optionToSelect}]`,
    )
      .contains('String')
      .click();

    cy.get(`[data-cy=${GraphQLEditorDomStructure.tree.elements.CodePane.name}]`)
      .find('textarea')
      .invoke('val')
      .then((v) => {
        expect(v).equal('type Query{\n\tstring: String\n}\n');
      });
  });
});
