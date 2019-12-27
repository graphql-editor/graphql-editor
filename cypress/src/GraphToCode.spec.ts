import { getEditorLines, Diagram, compareWithEditor, Sidebar } from './Action';
const createNode = (
  x: number,
  y: number,
  name: string,
  nodeType: 'type' | 'scalar' | 'input' | 'interface' | 'directive' | 'union' | 'Extend',
) => {
  Diagram().rightclick(x, y);
  Diagram()
    .contains(nodeType)
    .click();
  cy.get('body').type(name);
  // Defocus
  Diagram().click(100, 300);
  return {
    doubleclick: () => Diagram().dblclick(x + 50, y + 20),
    rightclick: () => Diagram().rightclick(x + 50, y + 20),
    inputs: () => Diagram().click(x - 15, y + 10),
  };
};

describe('Testing creation of nodes and transforming them to code', () => {
  it('shows code for created root node', () => {
    cy.visit('/');
    Diagram().rightclick(100, 100);
    Diagram()
      .contains('scalar')
      .click();
    cy.get('body').type('Hello');
    Sidebar().click();
    compareWithEditor(`scalar Hello`);
  });
  it('node can be renamed by doubleclick', () => {
    cy.visit('/');
    const HelloNode = createNode(100, 100, 'Hello', 'scalar');
    HelloNode.doubleclick();
    cy.get('body').type('Helloooo');
    Sidebar().click();
    compareWithEditor(`scalar Helloooo`);
  });
  it('node can be deleted and code will disappear', () => {
    cy.visit('/');
    const HelloNode = createNode(100, 100, 'Hello', 'scalar');
    HelloNode.rightclick();
    Diagram()
      .contains('delete')
      .click();
    getEditorLines().then(($element) => {
      expect($element.text()).not.to.match(/scalar\sHello/);
    });
  });
  it('node can be marked query', () => {
    cy.visit('/');
    const HelloNode = createNode(100, 100, 'Hello', 'type');
    HelloNode.inputs();
    Diagram()
      .contains('scalars')
      .click();
    Diagram()
      .contains('String')
      .click();
    cy.get('body').type('Helloooo');
    HelloNode.rightclick();
    Diagram()
      .contains('query')
      .click();
    Sidebar().click();
    compareWithEditor(`type Hello{ Helloooo: String } schema{ query: Hello }`);
  });
});
