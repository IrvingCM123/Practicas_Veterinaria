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
  beforeEach(() => {
    cy.visit('/');
    cy.get('#txt-input').type('admin@hotmail.com');
    cy.get('#pwd').type('demo');
    cy.get('#btnIniciarSesion').click();
    cy.url().should('include', '/inicio');
  });

  it('El componente de navegación debe tener 1 botón para cerrar sesión', () => {
    cy.get('.Contenedor_Navegador').find('button').should('have.length', 1);
    cy.get('.Contenedor_Navegador')
      .find('button')
      .should('have.text', 'Cerrar Sesión');
  });

  it('Al hacer click en cerrar sesion, se debe redirigir al login', () => {
    cy.get('.Contenedor_Navegador').find('button').click();
    cy.url().should('include', '/');
  });

  it('El menú de navegación debe tener 3 enlaces para redirigir a las pestañas correctas', () => {
    const rutasEsperadas = ['/inicio', '/inventario', '/ventas'];

    cy.get('.Rutas_Navegacion a')
      .should('have.length', rutasEsperadas.length)
      .each(($el, index) => {
        const ruta = $el.attr('routerLink');
        const rutaEsperada = rutasEsperadas[index];

        expect(ruta).to.exist;
        expect(ruta).to.equal(rutaEsperada);
      });
  });

  it('Debe verificar la existencia de la foto y el nombre de la tienda', () => {
    cy.get('.Informacion_Tienda img').should('exist');
    cy.get('.Informacion_Tienda p').should('exist');
  });

  it('La foto y el nombre de la tienda deben ser correctos', () => {
    cy.get('.Informacion_Tienda img')
      .should('have.attr', 'src')
      .should('include', 'assets/Imagenes/logo.png');
    cy.get('.Informacion_Tienda p').should('have.text', 'Como perros y gatos');
  });
});

describe('Pruebas sobre las rutas de navegación', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#txt-input').type('admin@hotmail.com');
    cy.get('#pwd').type('demo');
    cy.get('#btnIniciarSesion').click();
    cy.url().should('include', '/inicio');
  });

  it('Al presionar el enlace al inventario se redirecciona correctamente', () => {
    cy.get('.Rutas_Navegacion a').contains('Inventario').click();

    cy.wait(100);

    cy.url().should('include', '/inventario');
  });

  it('Al presionar el enlace a ventas se redirecciona correctamente', () => {
    cy.get('.Rutas_Navegacion a').contains('Ventas').click();

    cy.wait(100);

    cy.url().should('include', '/ventas');
  });

  it('Al presionar el enlace a inicio se redirecciona correctamente', () => {
    cy.get('.Rutas_Navegacion a').contains('Inicio').click();

    cy.wait(100);

    cy.url().should('include', '/inicio');
  });
});

describe('Pruebas sobre el componente de inicio', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#txt-input').type('admin@hotmail.com');
    cy.get('#pwd').type('demo');
    cy.get('#btnIniciarSesion').click();
    cy.url().should('include', '/inicio');
  });

  it('Debe mostrar el título del componente y las imágenes', () => {
    cy.get('.container .contenedor').should('exist');
    cy.get('.contenedor header').should('exist');
    cy.get('.contenedor header h3').should('exist');
    cy.get('.contenedor header h1').should('exist');

    cy.get('.container img')
      .should('have.length', 10)
      .each(($img) => {
        cy.wrap($img).should('exist');
      });
  });

  it('Verifica que el titulo del componente sea correcto', () => {
    cy.get('.contenedor header h3').should('have.text', 'Bienvenido');
    cy.get('.contenedor header h1').should(
      'have.text',
      'Veterinaria Como Perros y Gatos'
    );
  });
});

describe('Pruebas sobre el componente del footer', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#txt-input').type('admin@hotmail.com');
    cy.get('#pwd').type('demo');
    cy.get('#btnIniciarSesion').click();
    cy.url().should('include', '/inicio');
  });

  it('Verifica que el título del componente sea correcto', () => {
    cy.get('.Contenedor_Legacy').find('app-footer').should('exist');

    cy.get('.footer .container .left h3').should(
      'have.text',
      'Dirección: Junto al garaje del Hotel Trueba. Sur. 11 No. 337 Orizaba, Ver.'
    );
  });

  it('Verifica la información de dirección en el footer', () => {
    cy.get('.footer .container .left h3 span').should(
      'have.text',
      'Junto al garaje del Hotel Trueba. Sur. 11 No. 337 Orizaba, Ver.'
    );
  });

  it('Verifica la información de teléfono en el footer', () => {
    cy.get('.footer .container .center h3').should(
      'have.text',
      'Teléfono: 272-724-2852 / 272-114-6086 / 272-154-7909'
    );
  });

  it('Verifica la información de contacto-soporte en el footer', () => {
    cy.get('.footer .container .right h3 span').should(
      'have.text',
      'Irving.CondeM@Gmail.com / # 272-149-5728'
    );
  });
});

describe('Pruebas sobre el componente de inventario', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.get('#txt-input').type('admin@hotmail.com');
    cy.get('#pwd').type('demo');
    cy.get('#btnIniciarSesion').click();
    cy.url().should('include', '/inicio');

    cy.get('.Rutas_Navegacion a').contains('Inventario').click();
  });


  it('Verifica que el título del componente sea correcto', () => {
    cy.get('.Contenedor_Contenido').find('app-inventario').should('exist');
   // cy.get('.Contenedor_Contenido app-inventario h1').should(
   //   'have.text',
   //   'Inventario'
   // );
  });

}
);
