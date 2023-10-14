import { producto_Entity } from "../models/producto.entity";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Producto } from "src/app/ui/escaner/escaner.component";
import { ProductoPort } from "src/app/config/puertos/producto-puertos/producto-puerto";

@Injectable({
  providedIn: 'root'
})

export class ProductoUseCase {

  constructor (private _productoPort: ProductoPort) {}

  postProducto(producto: any | []): Observable<producto_Entity> {
    return this._productoPort.postProducto(producto);
  }

  getProducto(): Observable<producto_Entity[]> {
    return this._productoPort.getProducto();
  }

  deleteProducto(productoID: string): Observable<producto_Entity> {
    return this._productoPort.deleteProducto(productoID);
  }

  putProducto(producto: any | []): Observable<producto_Entity> {
    return this._productoPort.putProducto(producto);
  }

  getProductoID(productoID: string): Observable<producto_Entity> {
    return this._productoPort.getProductoID(productoID);
  }

}
