import { Injectable } from '@angular/core';
import { Datos_Locales } from './DatosLocales.service';

interface ProductoEncontrado {
  ID: string;
  Nombre: string;
  Precio: number;
  Cantidad: number;
  Subtotal: number;
}

@Injectable({
  providedIn: 'root',
})
export class Venta_Service {

  private productosEncontrados: ProductoEncontrado[] = [];

  constructor(private datos_locales: Datos_Locales) {
    // En el constructor, carga la lista desde el almacenamiento local si existe
    const productosGuardados = this.datos_locales.obtener_DatoLocal("Productos");
    this.productosEncontrados = productosGuardados ? JSON.parse(productosGuardados) : [];
  }

  agregarProductoEncontrado(producto: ProductoEncontrado) {
    const index = this.productosEncontrados.findIndex((p) => p.ID === producto.ID);
    if (index !== -1) {
      // El producto ya existe en la lista, incrementa la cantidad
      this.productosEncontrados[index].Cantidad += 1;
      this.productosEncontrados[index].Subtotal =
        this.productosEncontrados[index].Cantidad * this.productosEncontrados[index].Precio;
    } else {
      // El producto no existe en la lista, agrégalo
      this.productosEncontrados.push(producto);
    }
    // Luego de actualizar la lista, guárdala en el almacenamiento local
    this.datos_locales.guardar_ArregloLocal("Productos", this.productosEncontrados);
  }

  obtenerProductosEncontrados() {
    return this.productosEncontrados;
  }
}
