describe('Login Paul', () => {
  const pageURL = 'http://localhost:5173/login';
  const adminEmail = Cypress.env('ADMIN_EMAIL');
  const adminPassword = Cypress.env('ADMIN_PASSWORD');
  const invalidEmail = 'admin';

  beforeEach(() => {
    cy.visit(pageURL);
  });

  it('Login like an Admin user', () => {
    cy.get('[data-testid="email-login"]').type(adminEmail);
    cy.get('[data-testid="password-login"]').type(adminPassword);
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="calendar-title"]').should('contain.text', 'Calendario de Eventos');
  });

  it('Login without credentials', () => {
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="email-login"]').should('have.value', '');
    cy.get('[data-testid="password-login"]').should('have.value', '');
    cy.get('[data-testid="error-message-email"]').should('contain.text', 'El correo es requerido');
    cy.get('[data-testid="error-message-password"]').should(
      'contain.text',
      'El password es requerido'
    );
  });

  it('Login with invalid email', () => {
    cy.get('[data-testid="email-login"]').type(invalidEmail);
    cy.get('[data-testid="password-login"]').type(adminPassword);
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="error-message-email"]').should(
      'contain.text',
      'Correo electrónico inválido'
    );
  });
});
