import { Component, ElementRef, ViewChild } from '@angular/core';

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

@Component({
  selector: 'app-imprimir-tickets',
  templateUrl: './imprimir-tickets.component.html',
  styleUrls: ['./imprimir-tickets.component.scss']
})
export class ImprimirTicketsComponent {

  ngOnInit(): void {
  }


  @ViewChild('tablaImprimir', { static: false }) tablaImprimir: ElementRef | any;

  ticket: TicketData | any; // Esta variable almacenará los datos del ticket

  constructor() {
    // Aquí cargarías los datos dinámicos de tu JSON y los asignarías a this.ticket
    // Ejemplo:
    this.ticket = {
      logoUrl: 'https://yt3.ggpht.com/-3BKTe8YFlbA/AAAAAAAAAAI/AAAAAAAAAAA/ad0jqQ4IkGE/s900-c-k-no-mo-rj-c0xffffff/photo.jpg',
      tienda: 'Como perros y gatos',
      fecha: '17/09/2023',
      productos: [
        { cantidad: 1.00, nombre: 'Producto 1', precio: '$10.00' },
        { cantidad: 2.00, nombre: 'Producto 2', precio: '$20.00' },
        // ... otros productos ...
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
          /* Estilo para la imagen */
          .logo-img {
            max-width: 7cm; /* Ancho máximo de 7cm para la imagen */
            height: auto; /* Mantener la proporción de aspecto */
            display: block; /* Evitar espacios innecesarios alrededor de la imagen */
            margin: 0 auto; /* Centrar la imagen horizontalmente */
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
