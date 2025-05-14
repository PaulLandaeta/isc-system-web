/// <reference types="cypress" />

const emailDGS = 'alexismarechal@upb.edu';
const passwordDGS = '123456';

Cypress.Commands.add('login', (email, password) => {
  if (typeof email !== 'string' || typeof password !== 'string') {
    throw new Error('Email and password must be strings');
  }

  cy.visit('http://localhost:5173/login');
  cy.get('input[name=email]').type(email);
  cy.get('input[name=password]').type(password);
  cy.contains('Login').click();
});

describe('Should not Delete Gradutaing Student', () => {
  it('Should delete student', () => {
    const studentName = 'Camilo Zuleta Wolff';

    cy.login(emailDGS, passwordDGS);
    cy.get('[data-testid="SchoolOutlinedIcon"]').click();

    cy.contains(studentName)
      .parents('[role="row"]')
      .within(() => {
        cy.get('[aria-label="eliminar"]').click();
      });

    cy.contains('button', 'Eliminar').click();

    cy.reload();
    cy.get('body').should('contain', studentName);
  });
});
