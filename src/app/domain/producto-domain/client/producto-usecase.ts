import { producto_Entity } from '../models/producto.entity';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Producto } from 'src/app/ui/escaner/escaner.component';
import { ProductoPort } from 'src/app/config/puertos/producto-puertos/producto-puerto';

@Injectable({
  providedIn: 'root',
})
export class ProductoUseCase {
  constructor(private _productoPort: ProductoPort) {}

  postProducto(
    nombre: string,
    precio: string,
    cantidad: string,
    descripcion: string,
    imagen: string,
    id_marca: string,
    idCategoria: string,
    idProveedor: string,
    idAnimal: string,
    id_tipoCantidad: string,
    codigoBarra: string,
    precio_granel: string,
    venta_granel: boolean
  ): Observable<producto_Entity> {
    return this._productoPort.postProducto(
      nombre,
      precio,
      cantidad,
      descripcion,
      imagen,
      id_marca,
      idCategoria,
      idProveedor,
      idAnimal,
      id_tipoCantidad,
      codigoBarra,
      precio_granel,
      venta_granel
    );
  }

  getProducto(): Observable<producto_Entity[]> {
    return this._productoPort.getProducto();
  }

  deleteProducto(productoID: string): Observable<producto_Entity> {
    return this._productoPort.deleteProducto(productoID);
  }

  putProducto(
    nombre: string,
    precio: string,
    cantidad: string,
    descripcion: string,
    imagen: string,
    id_marca: string,
    idCategoria: string,
    idProveedor: string,
    idAnimal: string,
    id_tipoCantidad: string,
    codigoBarra: string,
    precio_granel: string,
    venta_granel: boolean,
    id_producto: any
  ): Observable<producto_Entity> {
    return this._productoPort.putProducto(
      nombre,
      precio,
      cantidad,
      descripcion,
      imagen,
      id_marca,
      idCategoria,
      idProveedor,
      idAnimal,
      id_tipoCantidad,
      codigoBarra,
      precio_granel,
      venta_granel,
      id_producto
    );
  }

  getProductoID(productoID: string): Observable<producto_Entity> {
    return this._productoPort.getProductoID(productoID);
  }
}
