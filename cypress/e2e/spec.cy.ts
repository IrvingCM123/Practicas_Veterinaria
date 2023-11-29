describe('Pruebas Login', () => {

  it('Verificar titulo e input en el formulario', () => {
    cy.visit('/');
    cy.get('#Titulo_Formulario').should('be.visible');
    cy.get('#Titulo_Formulario').should('have.text', 'Iniciar Sesión');
    cy.get('#txt-input').should('be.visible');
    cy.get('#pwd').should('be.visible');
    cy.get('#btnIniciarSesion').should('be.visible');
  });

  it('Probar un usuario inválido', () => {
    cy.visit('/');
    cy.get('#txt-input').type('admin@hotmail');
    cy.get('#pwd').type('demo');
    cy.get('#btnIniciarSesion').click();

    cy.get('#error').should('be.visible');

    cy.get('#error').invoke('text').then((mensaje) => {
      const mensajeLimpio = mensaje.replace(/\s+/g, ' ').trim();
      expect(mensajeLimpio).to.equal('Error al iniciar sesión Error al iniciar sesión Error al iniciar sesión Error al iniciar sesión Error al iniciar sesión');
    });
  });



  it('Entrar al sistema con usuario válido', () => {
    cy.visit('/');
    cy.get('#txt-input').type('admin@hotmail.com');
    cy.get('#pwd').type('demo');
    cy.get('#btnIniciarSesion').click();
    cy.url().should('include', '/inicio');
  });
});
