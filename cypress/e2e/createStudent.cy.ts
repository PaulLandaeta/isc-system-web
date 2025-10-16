/// <reference types="cypress" />

const email = 'paulwilkerlf@gmail.com';
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

describe('Create new student', () => {
  const code = Math.floor(Math.random() * 100000);
  const name = `Student${code}`;
  const lastname = `Student${code}`;
  const emailS = `Student${code}@gmail.`;

  beforeEach(() => {
    cy.login(email, password);
  });

  it('Should create a new student licensed successfully', () => {
    cy.get('[data-testid="MenuIcon"]').should('be.visible').click();
    cy.get('[data-testid="SchoolOutlinedIcon"]').should('be.visible').click();
    cy.get('.MuiButton-containedSecondary.css-kcsbbo-MuiButtonBase-root-MuiButton-root')
      .should('be.visible')
      .click();
    // insert data
    cy.get('#name')
      .should('be.visible')
      .type(name + 'licensed');
    cy.get('#lastname')
      .should('be.visible')
      .type(lastname + 'licensed');
    cy.get('#code')
      .should('be.visible')
      .type(code.toString() + 1);
    cy.get('#degree').should('be.visible').click();
    cy.get('[data-value="licenciado"]').should('be.visible').click();
    cy.get('#email').type(emailS + 'com');
    cy.get('#phone').type(code.toString() + 1);

    // save
    cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-containedPrimary')
      .should('be.visible')
      .click();

    // verify student creation
    cy.get('.MuiAlert-message.css-1pxa9xg-MuiAlert-message')
      .should('be.visible')
      .and('contain', 'Profesor creado con éxito');
  });

  it('Should create a new student maestrer successfully', () => {
    cy.get('[data-testid="MenuIcon"]').should('be.visible').click();
    cy.get('[data-testid="SchoolOutlinedIcon"]').should('be.visible').click();
    cy.get('.MuiButton-containedSecondary.css-kcsbbo-MuiButtonBase-root-MuiButton-root')
      .should('be.visible')
      .click();
    // insert data
    cy.get('#name')
      .should('be.visible')
      .type(name + 'maestrer');
    cy.get('#lastname')
      .should('be.visible')
      .type(lastname + 'maestrer');
    cy.get('#code')
      .should('be.visible')
      .type(code.toString() + 2);
    cy.get('#degree').should('be.visible').click();
    cy.get('[data-value="maestro"]').should('be.visible').click();
    cy.get('#email').type(emailS + 'edu');
    cy.get('#phone').type(code.toString() + 2);

    // save
    cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-containedPrimary')
      .should('be.visible')
      .click();

    // verify student creation
    cy.get('.MuiAlert-message.css-1pxa9xg-MuiAlert-message')
      .should('be.visible')
      .and('contain', 'Profesor creado con éxito');
  });

  it('Should create a new student PhD successfully', () => {
    cy.get('[data-testid="MenuIcon"]').should('be.visible').click();
    cy.get('[data-testid="SchoolOutlinedIcon"]').should('be.visible').click();
    cy.get('.MuiButton-containedSecondary.css-kcsbbo-MuiButtonBase-root-MuiButton-root')
      .should('be.visible')
      .click();
    // insert data
    cy.get('#name')
      .should('be.visible')
      .type(name + 'PhD');
    cy.get('#lastname')
      .should('be.visible')
      .type(lastname + 'PhD');
    cy.get('#code')
      .should('be.visible')
      .type(code.toString() + 3);
    cy.get('#degree').should('be.visible').click();
    cy.get('[data-value="maestro"]').should('be.visible').click();
    cy.get('#email').type(emailS + 'bo');
    cy.get('#phone').type(code.toString() + 3);

    // save
    cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-containedPrimary')
      .should('be.visible')
      .click();

    // verify student creation
    cy.get('.MuiAlert-message.css-1pxa9xg-MuiAlert-message')
      .should('be.visible')
      .and('contain', 'Profesor creado con éxito');
  });
});
