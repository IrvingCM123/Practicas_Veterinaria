import { Inventario } from "../models/inventario.entity";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { InventarioPort } from "src/app/config/puertos/inventario-puertos/inventario-ports";

@Injectable({
  providedIn: 'root'
})
export class InventarioUseCase {

  constructor (private _inventarioPort: InventarioPort) {}

  postProducto(producto: any | []): Observable<Inventario> {
    return this._inventarioPort.postProducto(producto);
  }

  getProducto(): Observable<Inventario[]> {
    return this._inventarioPort.getProducto();
  }

  deleteProducto(productoID: string): Observable<Inventario> {
    return this._inventarioPort.deleteProducto(productoID);
  }

  putProducto(producto: any | []): Observable<Inventario> {
    return this._inventarioPort.putProducto(producto);
  }

  getProductoID(productoID: string): Observable<Inventario> {
    return this._inventarioPort.getProductoID(productoID);
  }

}
