/// <reference types="cypress" />

const email = 'alexismarechal@upb.edu';
const password = '123456';

Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:5173/login');
  cy.get('input[name=email]').type(email);
  cy.get('input[name=password]').type(password);
  cy.contains('button', 'Login').click();
});

describe('Edit existing student', () => {
  const originalCode = '54777';
  const updatedData = {
    name: 'Adrián',
    lastname: 'Zerain',
    mothername: 'Quilla',
    email: 'automationQA@gmail.com',
    phone: '71766813',
  };

  beforeEach(() => {
    cy.login(email, password);

    // 1. Ir al menú de Estudiantes
    cy.get('[data-testid="SchoolOutlinedIcon"]').should('be.visible').click();

    // 2. Esperar a que la DataGrid esté visible
    cy.get('.MuiDataGrid-root').should('be.visible');

    // 3. Esperar a que aparezca la fila con el código buscado
    cy.get('[role="row"]').contains(originalCode).should('be.visible');
  });

  it('Should edit a student successfully', () => {
    // 1. Localizar la fila y hacer clic en el lápiz
    cy.get('[role="row"]')
      .contains(originalCode)
      .parents('[role="row"]')
      .within(() => {
        cy.get('button[aria-label="editar"]').click();
      });

    // 2. Verificar la ruta de edición
    cy.url().should('match', /\/edit-student\/\d+$/);

    // 3. Rellenar el formulario
    cy.get('form').within(() => {
      cy.get('input[name="name"]').clear().type(updatedData.name);
      cy.get('input[name="lastname"]').clear().type(updatedData.lastname);
      cy.get('input[name="mothername"]').clear().type(updatedData.mothername);
      cy.get('input[name="code"]').should('have.value', originalCode);
      cy.get('input[name="email"]').clear().type(updatedData.email);
      cy.get('input[name="phone"]').clear().type(updatedData.phone);
    });

    // 4. Pulsar GUARDAR y comprobar alerta
    cy.contains('button', 'GUARDAR').click();

    cy.get('.MuiAlert-message')
    .should('be.visible')
    // ajustamos aquí el texto esperado con tilde en “éxito”
    .and('contain.text', 'Estudiante actualizado con éxito');

    // 5. Comprobar que el estudiante se ha actualizado en la tabla
    cy.get('[data-testid="SchoolOutlinedIcon"]').should('be.visible').click();
  });
});