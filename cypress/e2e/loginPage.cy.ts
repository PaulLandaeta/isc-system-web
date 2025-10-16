describe('Login Test', () => {
  const pageURL = 'http://localhost:5173';
  const validAdminEmail = Cypress.env('ADMIN_EMAIL');
  const validAdminPassword = Cypress.env('ADMIN_PASSWORD');
  const validInternEmail = Cypress.env('INTERN_EMAIL');
  const validInternPassword = Cypress.env('INTERN_PASSWORD');
  const validCareerManagerEmail = Cypress.env('CAREER_MANAGER_EMAIL');
  const validCareerManagerPassword = Cypress.env('CAREER_MANAGER_PASSWORD');
  const validSupervisorEmail = Cypress.env('SUPERVISOR_EMAIL');
  const validSupervisorPassword = Cypress.env('SUPERVISOR_PASSWORD');
  var isLoggedIn = false;

  beforeEach(() => {
    cy.visit(pageURL);
    isLoggedIn = false;
  });

  it('Login like an admin user', () => {
    cy.get('[data-test-id="email-login"]').type(validAdminEmail);
    cy.get('[data-test-id="password-login"]').type(validAdminPassword);
    cy.get('[data-test-id="login-button"]').click();
    cy.get('[data-test-id="calendar-title"]').should('contain.text', 'Calendario de Eventos');
    isLoggedIn = true;
  });

  it('Login like an intern user', () => {
    cy.get('[data-test-id="email-login"]').type(validInternEmail);
    cy.get('[data-test-id="password-login"]').type(validInternPassword);
    cy.get('[data-test-id="login-button"]').click();
    cy.get('[data-test-id="message-total-hours-required"]').should(
      'contain.text',
      'Total de Horas Requeridas'
    );
    isLoggedIn = true;
  });

  it('Login like a career manager user', () => {
    cy.get('[data-test-id="email-login"]').type(validCareerManagerEmail);
    cy.get('[data-test-id="password-login"]').type(validCareerManagerPassword);
    cy.get('[data-test-id="login-button"]').click();
    cy.get('[data-test-id="approved-students-by-period-message"]').should(
      'contain.text',
      'Estudiantes Aprobados por Período'
    );
    isLoggedIn = true;
  });

  it('Login like a supervisor user', () => {
    cy.get('[data-test-id="email-login"]').type(validSupervisorEmail);
    cy.get('[data-test-id="password-login"]').type(validSupervisorPassword);
    cy.get('[data-test-id="login-button"]').click();
    cy.get('[data-test-id="sidebar-list-title"]').should('have.length', 3);
    isLoggedIn = true;
  });

  it('Login without credentials', () => {
    cy.get('[data-test-id="login-button"]').click();
    cy.get('[data-test-id="email-login"]').should('have.value', '');
    cy.get('[data-test-id="error-message-email"]').should('contain.text', 'El correo es requerido');
    cy.get('[data-test-id="error-message-password"]').should(
      'contain.text',
      'El password es requerido'
    );
  });

  it('Login with invalid email', () => {
    cy.get('[data-test-id="email-login"]').type('admin');
    cy.get('[data-test-id="password-login"]').type(validAdminPassword);
    cy.get('[data-test-id="login-button"]').click();
    cy.get('[data-test-id="error-message-email"]').should(
      'contain.text',
      'Correo electrónico inválido'
    );
  });

  it('Login with invalid password and less than 6 characters', () => {
    cy.get('[data-test-id="email-login"]').type(validAdminEmail);
    cy.get('[data-test-id="password-login"]').type('123');
    cy.get('[data-test-id="login-button"]').click();
    cy.get('[data-test-id="error-message-password"]').should(
      'contain.text',
      'Debe tener al menos 6 caracteres'
    );
  });

  it('Login with invalid password', () => {
    cy.get('[data-test-id="email-login"]').type(validAdminEmail);
    cy.get('[data-test-id="password-login"]').type('123882929');
    cy.get('[data-test-id="login-button"]').click();
    cy.get('[data-test-id="error-message-credentials"]').should(
      'contain.text',
      'Credenciales incorrectas'
    );
  });

  it('Should display correctly on tablet', () => {
    cy.viewport('ipad-2');
    cy.get('[data-test-id="login-button"]').should('be.visible');
    cy.get('[data-test-id="email-login"]').should('be.visible');
    cy.get('[data-test-id="password-login"]').should('be.visible');
  });

  afterEach(() => {
    if (isLoggedIn) {
      cy.get('[data-test-id="user_icon"]').click();
      cy.get('[data-test-id="logout_button"]').click();
    }
  });
});
