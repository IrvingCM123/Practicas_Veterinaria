import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';

interface TicketData {
  logoUrl: string;
  tienda: string;
  fecha: string;
  productos: Producto[];
}

interface Producto {
  cantidad: number;
  nombre: string;
  precio: string;
}

@Injectable({
  providedIn: 'root',
})
export class Tickets_Service {

  ngOnInit(): void {
  }


  @ViewChild('tablaImprimir', { static: false }) tablaImprimir: ElementRef | any;

  ticket: TicketData | any;

  constructor() {
    this.ticket = {
      logoUrl: '../../../assets//Imagenes/logo.png',
      tienda: 'Como perros y gatos',
      fecha: '19/09/2023',
      productos: [
        { cantidad: 1.00, nombre: 'Producto 1', precio: '$10.00' },
        { cantidad: 2.00, nombre: 'Producto 2', precio: '$20.00' },
        { cantidad: 3.00, nombre: 'Producto 3', precio: '$30.00' },
        { cantidad: 4.00, nombre: 'Producto 4', precio: '$40.00' },
      ]
    };
  }
  imprimir() {
    const tablaHTML = this.convertirTicketaTabla(this.ticket);
    const ventanaImpresion: any = window.open('', '', 'width=1000,height=600');
    ventanaImpresion.document.write(`
      <html>
      <head>
        <title>Impresión</title>
        <style>
          /* Estilo para el contenedor del ticket */
          .ticket {
            text-align: center;
            position: absolute;
            top: 20%;
            left: 30%;
            transform: translate(-50%, -50%);
            align-content: center;
          }

          /* Estilo para la imagen */
          .logo-img {
            max-width: 7cm;
            height: auto;
            display: block;
            margin: 0 auto;
          }

          /* Estilo para el texto centrado */
          .centrado {
            text-align: center;
            margin: 10px 0;
          }

          body {
            font-family: Arial, sans-serif;
            width: 10cm;
            height: 22cm;
            margin: 0;
            padding: 0;
            position: relative;
          }

          p {
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <div class="ticket">
          <img class="logo-img" src="${this.ticket.logoUrl}" alt="Logotipo">
          <p class="centrado">${this.ticket.tienda}<br>${this.ticket.fecha}</p>
          ${tablaHTML}
          <p class="centrado">¡GRACIAS POR SU COMPRA!<br></p>
        </div>
        <script type="text/javascript">
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            }
          }
        </script>
      </body>
      </html>
    `);
    ventanaImpresion.document.close();
  }

  imprimirEtiqueta() {
    const tablaHTML = this.convertirTicketaTabla(this.ticket);
    const ventanaImpresion: any = window.open('', '', 'width=1000,height=600');
    ventanaImpresion.document.write(`
      <html>
      <head>
        <title>Impresión</title>
        <style>
          /* Estilo para el contenedor del ticket */
          /* Estilo para la imagen */
          .logo-img {
            max-width: 7cm;
            height: 100%;
            display: block;
            margin: 0 auto;
          }

          /* Estilo para el texto centrado */
          p {
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <div class="ticket">
          <img class="logo-img" src="https://1000logos.net/wp-content/uploads/2021/05/GitHub-logo.png" alt="Logotipo">
        </div>
        <script type="text/javascript">
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            }
          }
        </script>
      </body>
      </html>
    `);
    ventanaImpresion.document.close();
  }



  private convertirTicketaTabla(ticket: TicketData): string {
    let tablaHTML = '<table>';
    tablaHTML += '<thead><tr><th>CANT</th><th>PRODUCTO</th><th>$$</th></tr></thead>';
    tablaHTML += '<tbody>';

    for (const producto of ticket.productos) {
      tablaHTML += '<tr>';
      tablaHTML += `<td>${producto.cantidad}</td>`;
      tablaHTML += `<td>${producto.nombre}</td>`;
      tablaHTML += `<td>${producto.precio}</td>`;
      tablaHTML += '</tr>';
    }

    tablaHTML += '</tbody></table>';
    return tablaHTML;
  }
}
