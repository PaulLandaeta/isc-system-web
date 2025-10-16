describe('Login Admin Test', () => {
  const email = 'alexismarechal@upb.edu';
  const password = '123456';
  const url = 'http://localhost:5173/login';

  it('Should log in successfully', () => {
    cy.visit(url);

    // Insert data
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.contains('Login').click();

    // Verifity successful login
    cy.get('Login').should('not.exist');

    cy.contains('Estudiante').click();
    cy.get('button[aria-label="Go to next page"]').click();
    cy.get('[data-testid="DeleteIcon"]').eq(0).click();    		//Verificar que el usuario no tenga proceso de graduación
    cy.contains('Cancelar').should('exist');
    cy.contains('Eliminar').should('exist');

    cy.contains('Eliminar').click;
    
  });
});