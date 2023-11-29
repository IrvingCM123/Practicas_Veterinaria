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

    cy.get('#error')
      .invoke('text')
      .then((mensaje) => {
        const mensajeLimpio = mensaje.replace(/\s+/g, ' ').trim();
        expect(mensajeLimpio).to.equal(
          'Error al iniciar sesión Error al iniciar sesión Error al iniciar sesión Error al iniciar sesión Error al iniciar sesión'
        );
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

describe('Pruebas de inicio', () => {
  it('Si no se ha iniciado sesion, no debe mostrar nada, solo el formulario', () => {
    cy.visit('/');
    cy.get('#txt-input').should('be.visible');
    cy.get('#pwd').should('be.visible');
    cy.get('#btnIniciarSesion').should('be.visible');

    cy.get('.Interfaz_Contenedor').should('not.be.exist');
    cy.get('.Contenedor_Navegador').should('not.be.exist');
    cy.get('.Contenedor_Contenido').should('not.be.exist');
    cy.get('.Contenedor_Legacy').should('not.be.exist');
  });

  it('Al iniciar sesión, mostrar los componentes', () => {
    cy.visit('/');
    cy.get('#txt-input').type('admin@hotmail.com');
    cy.get('#pwd').type('demo');
    cy.get('#btnIniciarSesion').click();
    cy.url().should('include', '/inicio');

    cy.get('.Interfaz_Contenedor').should('be.visible');
    cy.get('.Contenedor_Navegador').should('be.visible');
    cy.get('.Contenedor_Contenido').should('be.visible');
    cy.get('.Contenedor_Legacy').should('be.visible');

    cy.get('.Contenedor_Contenido').find('app-inicio').should('exist');
    cy.get('.Contenedor_Navegador').find('app-header').should('exist');
    cy.get('.Contenedor_Legacy').find('app-footer').should('exist');

  });
});

describe('Prubas sobre el menú de navegación', () => {
  it('El componente de navegación debe tener 1 botón para cerrar sesión', () => {
    cy.visit('/');
    cy.get('#txt-input').type('admin@hotmail.com');
    cy.get('#pwd').type('demo');
    cy.get('#btnIniciarSesion').click();
    cy.url().should('include', '/inicio');

    cy.get('.Contenedor_Navegador').find('button').should('have.length', 1);
    cy.get('.Contenedor_Navegador')
      .find('button')
      .should('have.text', 'Cerrar Sesión');
  });

  it('Al hacer click en cerrar sesion, se debe redirigir al login', () => {
    cy.visit('/');
    cy.get('#txt-input').type('admin@hotmail.com');
    cy.get('#pwd').type('demo');
    cy.get('#btnIniciarSesion').click();
    cy.url().should('include', '/inicio');

    cy.get('.Contenedor_Navegador').find('button').click();
    cy.url().should('include', '/');
  });

  it('El menú de navegación debe tener 3 enlaces para redirigir a las pestañas correctas', () => {
    cy.visit('/');
    cy.get('#txt-input').type('admin@hotmail.com');
    cy.get('#pwd').type('demo');
    cy.get('#btnIniciarSesion').click();
    cy.url().should('include', '/inicio');

    const rutasEsperadas = ['/inicio', '/inventario', '/ventas'];

    cy.get('.Rutas_Navegacion a').should('have.length', rutasEsperadas.length).each(($el, index) => {
      const ruta = $el.attr('routerLink');
      const rutaEsperada = rutasEsperadas[index];

      expect(ruta).to.exist;
      expect(ruta).to.equal(rutaEsperada);
    });
  });

  it('Debe verificar la existencia de la foto y el nombre de la tienda', () => {
    cy.visit('/');
    cy.get('#txt-input').type('admin@hotmail.com');
    cy.get('#pwd').type('demo');
    cy.get('#btnIniciarSesion').click();
    cy.url().should('include', '/inicio');

    cy.get('.Informacion_Tienda img').should('exist');
    cy.get('.Informacion_Tienda p').should('exist');
  });

  it('La foto y el nombre de la tienda deben ser correctos', () => {
    cy.visit('/');
    cy.get('#txt-input').type('admin@hotmail.com');
    cy.get('#pwd').type('demo');
    cy.get('#btnIniciarSesion').click();
    cy.url().should('include', '/inicio');

    cy.get('.Informacion_Tienda img').should('have.attr', 'src').should('include', 'assets/Imagenes/logo.png');
    cy.get('.Informacion_Tienda p').should('have.text', 'Como perros y gatos');
  });

});

describe('Pruebas sobre las rutas de navegación', () => {
  it('Al iniciar sesión, se debe redirigir a la ruta de inicio', () => {
    cy.visit('/');
    cy.get('#txt-input').type('admin@hotmail.com');
    cy.get('#pwd').type('demo');
    cy.get('#btnIniciarSesion').click();
    cy.url().should('include', '/inicio');

  }
  );

});
