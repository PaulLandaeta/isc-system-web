/* eslint-disable sonarjs/no-duplicate-string */
/// <reference types="cypress" />

const emailBC = 'alexismarechal@upb.edu';
const passwordBC = '123456';

Cypress.Commands.add('login', (email, password) => {
  if (typeof email !== 'string' || typeof password !== 'string') {
    throw new Error('Email and password must be strings');
  }

  cy.visit('http://localhost:5173/login');
  cy.get('input[name=email]').type(email);
  cy.get('input[name=password]').type(password);
  cy.contains('Login').click();
});

describe('Checking the whole Student Environment', () => {
  it('Should login successfully', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[name=email]').type(emailBC);
    cy.get('input[name=password]').type(passwordBC);
    cy.contains('Login').click();

    cy.url().should('eq', 'http://localhost:5173/dashboard');
  });

  it('Should navigate to Students section', () => {
    cy.login(emailBC, passwordBC);
    cy.get('[data-testid="SchoolOutlinedIcon"]').should('be.visible').click();

    cy.url().should('eq', 'http://localhost:5173/students');
  });

  it('Should display the menu icon and UPB logo', () => {
    cy.login(emailBC, passwordBC);
    cy.get('[data-testid="MenuIcon"]').should('exist');
    cy.get('img[alt="UPB Logo"]').should('exist');
  });

  it('Should display the user information', () => {
    cy.login(emailBC, passwordBC);
    cy.contains('Alexis').should('exist');
    cy.contains('Profesor').should('exist');
  });

  it('Should display sidebar buttons: Students, Professors, Processes, Enrolled and Dashboard', () => {
    cy.login(emailBC, passwordBC);
    cy.contains('Estudiantes').should('exist');
    cy.contains('Docentes').should('exist');
    cy.contains('Procesos').should('exist');
    cy.contains('Inscritos').should('exist');
    cy.contains('Dashboard').should('exist');
  });

  it('Should display the student creation form after clicking "Add Student"', () => {
    cy.login(emailBC, passwordBC);
    cy.get('[data-testid="SchoolOutlinedIcon"]').should('be.visible').click();
    cy.get('[data-testid="AddIcon"]').click();
  });

  it('Inputs are visible and enabled', () => {
    cy.login(emailBC, passwordBC);
    cy.get('[data-testid="SchoolOutlinedIcon"]').should('be.visible').click();
    cy.get('[data-testid="AddIcon"]').click();

    cy.get('input[name="name"]').should('exist').and('be.visible').and('not.be.disabled');
    cy.get('input[name="lastname"]').should('exist').and('be.visible');
    cy.get('input[name="mothername"]').should('exist');
    cy.get('input[name="code"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="phone"]').should('exist');
  });

  it('Should toggle visibility of total_hours input when isIntern switch is clicked', () => {
    cy.login(emailBC, passwordBC);
    cy.get('[data-testid="SchoolOutlinedIcon"]').click();
    cy.get('[data-testid="AddIcon"]').click();

    cy.get('input[name="total_hours"]').should('not.exist');

    // Click on
    cy.get('input[name="isIntern"]').click();
    cy.get('input[name="total_hours"]').should('be.visible');

    // Click off
    cy.get('input[name="isIntern"]').click();
    cy.get('input[name="total_hours"]').should('not.exist');
  });

  it('Should create student', () => {
    cy.login(emailBC, passwordBC);
    cy.get('[data-testid="SchoolOutlinedIcon"]').click();
    cy.get('[data-testid="AddIcon"]').click();

    cy.get('input[name="name"]')
      .should('exist')
      .and('be.visible')
      .and('not.be.disabled')
      .type('TestName');
    cy.get('input[name="lastname"]').should('exist').and('be.visible').type('TestLastName');
    cy.get('input[name="mothername"]').should('exist').type('TestMotherName');
    cy.get('input[name="code"]').should('exist').type('01234');
    cy.get('input[name="email"]').should('exist').type('test@email.com');
    cy.get('input[name="phone"]').should('exist').type('12345678');

    cy.contains('button', 'GUARDAR').click();

    cy.contains('¡Estudiante Creado!').should('be.visible');
    cy.contains('El estudiante ha sido creado con éxito.').should('be.visible');
  });

  it('Should edit student', () => {
    const studentName = 'TestName TestLastName TestMotherName';
    const studentId = 25;

    cy.login(emailBC, passwordBC);
    cy.get('[data-testid="SchoolOutlinedIcon"]').click();
    cy.get('button[aria-label="Go to next page"]').click();
    // cy.wait(500);

    cy.contains(studentName)
      .parents('[role="row"]')
      .within(() => {
        cy.get('[aria-label="editar"]').click();
      });

    cy.url().should('eq', `http://localhost:5173/edit-student/${studentId}`);

    cy.get('input[name="name"]')
      .should('exist')
      .and('be.visible')
      .and('not.be.disabled')
      .type(' Edited');

    cy.contains('button', 'GUARDAR').click();

    cy.visit('http://localhost:5173/students');
    cy.get('body').should('not.contain', studentName);
  });

  it('Should delete student', () => {
    const studentName = 'TestName Edited TestLastName TestMotherName';

    cy.login(emailBC, passwordBC);
    cy.get('[data-testid="SchoolOutlinedIcon"]').click();
    cy.get('button[aria-label="Go to next page"]').click();
    // cy.wait(500);

    cy.contains(studentName)
      .parents('[role="row"]')
      .within(() => {
        cy.get('[aria-label="eliminar"]').click();
      });

    cy.contains('button', 'Eliminar').click();
    cy.reload();
    cy.get('body').should('not.contain', studentName);
  });
});
