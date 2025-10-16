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
    cy.contains(/agregar estudiante/i).click(); 
    cy.get('input[name=name]').type('Sebastian Pablo');
    cy.get('input[name=lastname]').type('Chacon');
    cy.get('input[name=mothername]').type('Mendoza');
    cy.get('input[name=code]').type('68005');
    cy.get('input[name=email]').type('sebasnocach@gmail.com');
    cy.get('input[name=phone]').type('65555965');
    cy.get('input[name=isIntern]').click();
    cy.get('input[name=total_hours]').clear().type('40');
    cy.contains('Estudiante').click();
    cy.get('[data-testid="DeleteIcon"]').eq(0).click(); 
    cy.contains('Cancelar').should('exist');
    cy.contains('Eliminar').should('exist');
    
  });
});