import { Control } from './control';

export class TextBox extends Control {
  constructor(selector: string) {
    super(selector);
  }

  setText(value: string): void {
    cy.get(this.selector).type(value);
  }

  clearSetText(value: string): void {
    cy.get(this.selector).clear().type(value);
  }

  clearSetTextEnter(value: string): void {
    cy.get(this.selector).clear().type(`${value}{enter}`);
  }

  setTextEnter(value: string): void {
    cy.get(this.selector).type(`${value}{enter}`);
  }
}
