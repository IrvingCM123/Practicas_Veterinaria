import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';

interface TicketData {
  logoUrl: string;
  tienda: string;
  fecha: string;
  productos: Producto[];
  total: string;
  montoPagado: number;
  cambio: number;
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

  imprimir(ticket: TicketData) {
    const tablaHTML = this.convertirTicketaTabla(ticket);
    const ventanaImpresion: any = window.open('', ''); // Cambio de ancho y alto
    ventanaImpresion.document.write(`
      <html>
      <head>
        <title>Impresión</title>
        <style>
          .ticket {
            width: 297px;
            height: 720px;
            margin: 0;
            padding: 1px;
          }

          /* Estilo para la imagen */
          .logo-img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;
          }

          /* Estilo para el texto centrado */
          .centrado {
            margin: 10px 5px;
          }

          /* Estilo para la tabla */
          table {
            width: 100%;
            border-collapse: collapse;
          }

          th, td {
            border: 1px solid #ddd;
            padding: 2px;
          }

          th {
            background-color: #f2f2f2;
          }

          /* Estilo para el monto a pagar y cambio */
          .monto {
            font-weight: bold;
            margin: 10px 20px;
          }

          /* Estilo para la información adicional */
          .info {
            font-size: 12px;
            margin: 10px 20px;
          }

          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }

          p {
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <div class="ticket">
          <img class="logo-img" src="${ticket.logoUrl}" alt="Logotipo">
          <p class="centrado" style="margin: 10px 60px;">${ticket.tienda}</p>
          <p class="centrado info">Dueño: Nombre del Dueño</p>
          <p class="centrado info">Dirección: Dirección del Local</p>
          <p class="centrado info">Teléfono: Número de Teléfono</p>
          <p class="centrado info">Fecha: ${ticket.fecha}</p>
          ${tablaHTML}
          <p class="centrado monto">Total: ${ticket.total}</p>
          <p class="centrado monto">Paga con: $${ticket.montoPagado.toFixed(2)}</p>
          <p class="centrado monto">Cambio: ${ticket.cambio.toFixed(2)}</p>
          <p class="centrado">¡GRACIAS POR SU COMPRA!</p>
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
