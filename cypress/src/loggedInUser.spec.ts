describe('I can login', function() {
  it('Check project create - delete flow', function() {
    cy.visit('/')
      .contains('x' as string)
      .click();
    cy.contains('Login')
      .click()
      .url()
      .then(($url: string) => {
        console.log($url);
        if ($url.indexOf('auth.graphqleditor.com') !== -1) {
          cy.get('input[type=email]').type('iphone@aexol.com');
          cy.get('input[type=password]').type('Krakow123');
          cy.get('.auth0-lock-submit').click();
        }

        cy.contains('Create new project' as string).click();
        cy.get('input').type('test-project-1');
        cy.contains('Create new project' as string).click();
        cy.wait(3000);
        cy.contains('projects').click();
        cy.contains('My projects')
          .parent()
          .parent()
          .contains('aexol/test-project-1')
          .parent()
          .parent()
          .contains('Delete')
          .click();
        cy.contains('Are you want to delete')
          .parent()
          .within(($popup) => {
            cy.get('input').type('test-project-1');
            cy.get('a')
              .contains('Delete project')
              .click();
          });
      });
  });
});
