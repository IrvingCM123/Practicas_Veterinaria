import { Injectable } from '@angular/core';
import { Datos_Locales } from './DatosLocales.service';

interface Venta {
  ID: string;
  Producto: Productos[];
  Fecha: string;
  Hora: string;
}

interface Productos {
  ID: string;
  Nombre: string;
  Precio: string;
  Cantidad: string;
  Subtotal: string;
  Total: string;
}

@Injectable({
  providedIn: 'root',
})

export class Venta_Service {

  recibir_productos(productos_vendidos: any | [ ] ) {

  }
}
