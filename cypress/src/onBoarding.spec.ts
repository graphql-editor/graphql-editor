describe('Examples exist', function() {
  it('Opens examples', function() {
    cy.visit('/');
    cy.contains('x' as string).click();
    cy.contains('examples').click();
    cy.contains('showcase/fake-twitter')
      .should('be.exist')
      .parent()
      .parent()
      .contains('Open')
      .click()
      .wait(2000)
      .url()
      .should('have.string', 'showcase/fake-twitter');
  });
});
describe('Public Projects exist', function() {
  it('List public projects', function() {
    cy.visit('/');
    cy.contains('x' as string).click();
    cy.contains('projects').click();
    cy.contains('Public projects')
      .click()
      .parent()
      .parent()
      .get('form')
      .submit()
      .next()
      .children()
      .should('have.length.greaterThan', 5);
  });
});
describe('Mock backend is functional', function() {
  it('Opens mock backend examples', function() {
    cy.visit('/');
    cy.contains('x' as string).click();
    cy.contains('examples').click();
    cy.contains('showcase/fake-twitter')
      .should('be.exist')
      .parent()
      .parent()
      .contains('Mock Backend')
      .click();
  });
});