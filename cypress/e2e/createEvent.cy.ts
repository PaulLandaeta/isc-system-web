describe('Create Event', () => {
  const pageURL = 'http://localhost:5173';
  const validCareerManagerEmail = Cypress.env('CAREER_MANAGER_EMAIL');
  const validCareerManagerPassword = Cypress.env('CAREER_MANAGER_PASSWORD');
  var isLoggedIn = false;

  beforeEach(() => {
    cy.visit(pageURL);
    isLoggedIn = false;
  });

  it('Login like a career manager user', () => {
    cy.get('[data-test-id="email-login"]').type(validCareerManagerEmail);
    cy.get('[data-test-id="password-login"]').type(validCareerManagerPassword);
    cy.get('[data-test-id="login-button"]').click();
    cy.get('[data-test-id="sidebar-list-button"]').contains('Lista de Eventos').click();
    // cy.get('[data-test-id="add-event-button"]').click();
    isLoggedIn = true;
  });

  afterEach(() => {
    if (isLoggedIn) {
      cy.get('[data-test-id="user_icon"]').click();
      cy.get('[data-test-id="logout_button"]').click();
    }
  });
});
