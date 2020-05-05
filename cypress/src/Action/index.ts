import { cypressGet, GraphQLEditorCypress } from '../../../src/cypress_constants';

export class Action {
  static click = (e: string) => Action.contains(e).click();
  static type = (e: string, value: string) => Action.contains(e).type(value);
  static shouldContain = (e: string, value: string) => Action.contains(e).should('contain', value);
  static toSelector = (e: string) => `[data-cy=${e}]`;
  static toProjectNameSelector = (e: string) => `[data-name="${e}"]`;
  static find = (e: string) => cy.find(Action.toSelector(e));
  static contains = (e: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable>) =>
    cy.get(Action.toSelector(e), options);
  static projectByName = (e: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable>) =>
    cy.get(Action.toProjectNameSelector(e), options);
}

export const getEditorLines = () => cy.get('.lines-content');
export const typeInEditor = (text: string) => {
  Action.contains(cypressGet(GraphQLEditorCypress, 'sidebar', 'code', 'name')).click(100, 100);
  cy.get('body').type(text);
};
export const Diagram = () => Action.contains(cypressGet(GraphQLEditorCypress, 'diagram', 'name'));
export const Sidebar = () => Action.contains(cypressGet(GraphQLEditorCypress, 'sidebar', 'name'));
export const pasteInEditor = (text: string) => {
  Action.contains(cypressGet(GraphQLEditorCypress, 'sidebar', 'code', 'name')).click(100, 100);
  cy.get('body').type(text, {
    delay: 0,
    parseSpecialCharSequences: false,
  });
};

export const strCompare = (wholeCode: string, partOfCode: string) => {
  const makeShrt = (s: string) =>
    s
      .replace(/\s\s+/g, ' ')
      .replace(/\s/g, ' ')
      .replace(/([{}=:])\s/g, '$1')
      .replace(/\s([{}=:])/g, '$1')
      .trim();
  expect(makeShrt(wholeCode)).to.include(makeShrt(partOfCode));
};

export const compareWithEditor = (text: string) =>
  getEditorLines().then(($element) => {
    strCompare($element.text(), text);
  });
