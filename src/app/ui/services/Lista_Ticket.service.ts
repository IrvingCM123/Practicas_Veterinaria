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
    const productosGuardados = this.datos_locales.obtener_DatoLocal("Productos");
    this.productosEncontrados = productosGuardados ? JSON.parse(productosGuardados) : [];
  }

  agregarProductoEncontrado(producto: ProductoEncontrado) {
    const index = this.productosEncontrados.findIndex((p) => p.ID === producto.ID);
    if (index !== -1) {
      this.productosEncontrados[index].Cantidad += 1;
      this.productosEncontrados[index].Subtotal =
        this.productosEncontrados[index].Cantidad * this.productosEncontrados[index].Precio;
    } else {
      this.productosEncontrados.push(producto);
    }
    this.datos_locales.guardar_ArregloLocal("Productos", this.productosEncontrados);
  }

  obtenerProductosEncontrados() {
    return this.productosEncontrados;
  }

  actualizarProductosEncontrados(productos: ProductoEncontrado[]) {
    this.productosEncontrados = productos;
    this.datos_locales.eliminar_DatoLocal("Productos");
    this.datos_locales.guardar_ArregloLocal("Productos", productos);
    console.log("Productos actualizados:", productos);
  }

  reiniciarProductosEncontrados() {
    this.productosEncontrados = [];
    this.datos_locales.eliminar_DatoLocal("Productos");
  }

  eliminarUltimoProductoEncontrado() {
    this.productosEncontrados.pop();
    this.datos_locales.eliminar_DatoLocal("Productos");
    this.datos_locales.guardar_ArregloLocal("Productos", this.productosEncontrados);
  }

}
