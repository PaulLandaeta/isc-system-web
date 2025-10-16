/// <reference types="cypress" />

export class Control {
    protected selector: string;
  
    constructor(selector: string) {
      this.selector = selector;
    }
  
    click(): void {
      cy.get(this.selector).click();
    }
  
    isControlDisplayed(): Cypress.Chainable<boolean> {
        return cy.get('body').then($body => {
          const body = $body as JQuery<HTMLElement>;
          const exists = body.find(this.selector).length > 0;
          if (exists) {
            return cy.get(this.selector).should('be.visible').then(() => true);
          } else {
            return cy.wrap(false); // <-- Solución clave
          }
        });
      }
      
      
    getText(): Cypress.Chainable<string> {
      return cy.get(this.selector).invoke('text');
    }
  
    getPropertyValue(property: string): Cypress.Chainable<string | undefined> {
      return cy.get(this.selector).invoke('attr', property);
    }
  }
  