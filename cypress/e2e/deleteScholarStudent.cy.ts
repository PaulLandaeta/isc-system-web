/// <reference types="cypress" />

const email = 'alexismarechal@upb.edu';
const password = '123456';

Cypress.Commands.add('login', (email, password) => {
  if (typeof email !== 'string' || typeof password !== 'string') {
    throw new Error('Email and password must be strings');
  }

  cy.visit('http://localhost:5173/login');
  cy.get('input[name=email]').type(email);
  cy.get('input[name=password]').type(password);
  cy.contains('Login').click();
});

describe('Should not Delete Scholar Student', () => {
  it('Should delete student', () => {
    const studentName = 'TestName TestLastName TestMotherName';

    cy.login(email, password);
    cy.get('[data-testid="SchoolOutlinedIcon"]').click();
    cy.get('button[aria-label="Go to next page"]').click();
    // cy.wait(500);

    cy.contains(studentName)
      .parents('[role="row"]')
      .within(() => {
        cy.get('[aria-label="eliminar"]').click();
      });

    cy.contains('button', 'Eliminar').click();
    // cy.wait(500);
    cy.get('body').should('not.contain', studentName);
  });
});
