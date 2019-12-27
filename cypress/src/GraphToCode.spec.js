"use strict";
describe('Testing creation of nodes and transforming them to code', () => {
    it('shows code for created root node', () => {
        cy.visit('/');
        cy.rightclick(500, 500);
    });
});
