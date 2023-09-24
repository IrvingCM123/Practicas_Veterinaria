import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';

interface TicketData {
  logoUrl: string;
  tienda: string;
  fecha: string;
  productos: Producto[];
  total: string;
  montoPagado: number;
  cambio: number;
  veterinaria_1: string;
  veterinaria_2: string;
  direccion: string;
  tel: string;
  cel_1: string;
  cel_2: string;
  lema: string;
}

interface Producto {
  cantidad: number;
  nombre: string;
  precio: string;
  marca: string;
}

@Injectable({
  providedIn: 'root',
})
export class Tickets_Service {
  ngOnInit(): void { }

  @ViewChild('tablaImprimir', { static: false }) tablaImprimir:
    | ElementRef
    | any;

  ticket: TicketData | any;

  constructor() {
    this.ticket = {
      logoUrl: '../../../assets//Imagenes/logo.png',
      tienda: 'Como perros y gatos',
      fecha: '19/09/2023',
      productos: [
        { cantidad: 1.0, nombre: 'Producto 1', precio: '$10.00' },
        { cantidad: 2.0, nombre: 'Producto 2', precio: '$20.00' },
        { cantidad: 3.0, nombre: 'Producto 3', precio: '$30.00' },
        { cantidad: 4.0, nombre: 'Producto 4', precio: '$40.00' },
      ],
    };
  }

  imprimir(ticket: TicketData) {
    const tablaHTML = this.convertirTicketaTabla(ticket);
    const ventanaImpresion: any = window.open('', '');
    ventanaImpresion.document.write(`
      <html>
      <head>
        <title>Impresión</title>
        <style>

          .ticket {
            width: 100%;
            height: auto;
            margin: 0;
            padding: 1px;
          }

          .logo-img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;
          }

          .centrado {
            margin: 10px 1px;
            font-size: 100%;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            padding: 0;
            margin: 0;
          }

          th, td {
            border: 1px solid #ddd;
            padding: 2px;
          }

          th {
            background-color: #f2f2f2;
          }

          .monto {
            font-size: 74%;
            margin: 10px 5px;
          }

          .info {
            font-size: 74%;
            margin: 10px 5px;
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
          <p class="centrado" style="margin: 6px 20px; font-size: 105%"">${ticket.tienda
      }</p>
          <p class="centrado" style="margin: 3px 10px 15px 19px; font-size: 80%">${ticket.lema
      }</p>
          <p class="centrado info">${ticket.veterinaria_1}</p>
          <p class="centrado info">${ticket.veterinaria_2}</p>
          <p class="centrado info">${ticket.fecha}</p>
          <p class="centrado info">-----------------------------------------------</p>
          <p class="centrado info">DESCRIPCION </p>
          ${tablaHTML}
          <p class="centrado info">-----------------------------------------------</p>
          <p class="centrado monto">Total: ${ticket.total}</p>
          <p class="centrado monto">Paga con: $${ticket.montoPagado.toFixed(
        2
      )}</p>
          <p class="centrado monto">Cambio: $${ticket.cambio.toFixed(2)}</p>
          <p class="centrado" style="font-size: 80%; margin: 15px 10px;">¡GRACIAS POR SU COMPRA!</p>

          <p class="centrado info">Dirección: ${ticket.direccion}</p>
          <p class="centrado info">Teléfono: ${ticket.tel}</p>
          <p class="centrado info">Celular: ${ticket.cel_1}</p>
          <p class="centrado info">Celular: ${ticket.cel_2}</p>
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
    let tablaHTML = '<table style="border-color: none; width: 98%;">';
    tablaHTML += '<thead><tr>';
    tablaHTML +=
      '<th style="font-size: 72%; font-weight: 400; border: none;">ID</th>';
    tablaHTML +=
      '<th style="font-size: 72%; font-weight: 400; border: none;">CANT</th>';
    tablaHTML +=
      '<th style="font-size: 72%; font-weight: 400; border: none;">P.UNIT</th>';
    tablaHTML +=
      '<th style="font-size: 72%; font-weight: 400; border: none;">SUBTOTAL</th>';
    tablaHTML += '</tr></thead>';
    tablaHTML += '<tbody>';

    for (const producto of ticket.productos) {
      tablaHTML += '<tr style="border-color: transparent; margin-top: 10px;">';
      tablaHTML +=
        '<tr><th colspan="4" style=" font-size: 74%; font-weight: 200; text-align: left;  border: none;">' +
        producto.nombre +
        ' ' +
        producto.marca +
        '</th></tr>';
      tablaHTML += `<td style="font-size: 73%; font-weight: 200; border: none;">${ticket.productos.indexOf(producto) + 1
        }</td>`;
      tablaHTML += `<td style="font-size: 73%; font-weight: 200; border: none;">${producto.cantidad}</td>`;
      tablaHTML += `<td style="font-size: 73%; font-weight: 200; border: none;">${producto.precio}</td>`;
      tablaHTML += `<td style="font-size: 73%; font-weight: 200; border: none;">$${(
        producto.cantidad * parseFloat(producto.precio.replace('$', ''))
      ).toFixed(2)}</td>`;
      tablaHTML += '</tr>';
    }

    tablaHTML += '</tbody></table>';
    return tablaHTML;
  }
}
