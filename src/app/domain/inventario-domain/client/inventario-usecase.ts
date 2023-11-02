import { Inventario } from '../models/inventario.entity';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { InventarioPort } from 'src/app/config/puertos/inventario-puertos/inventario-ports';

@Injectable({
  providedIn: 'root',
})
export class InventarioUseCase {
  constructor(private _inventarioPort: InventarioPort) { }

  postProducto(
    existencias: string | number,
    StockMinimo: string | number,
    StockMaximo: string | number,
    id_producto: any
  ): Observable<Inventario> {
    return this._inventarioPort.postProducto(
      existencias,
      StockMinimo,
      StockMaximo,
      id_producto
    );
  }

  getProducto(): Observable<Inventario[]> {
    return this._inventarioPort.getProducto();
  }

  deleteProducto(productoID: string): Observable<Inventario> {
    return this._inventarioPort.deleteProducto(productoID);
  }

  putProducto(
    existencias: string | number,
    StockMinimo: string | number,
    StockMaximo: string | number,
    id_producto: any
  ): Observable<Inventario> {
    return this._inventarioPort.putProducto(
      existencias,
      StockMinimo,
      StockMaximo,
      id_producto
    );
  }

  getProductoID(productoID: number): any {
    return this._inventarioPort.getProductoID(productoID);
  }
}
