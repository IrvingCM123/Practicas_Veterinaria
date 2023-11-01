import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { venta_Entity } from "../models/venta.entity";
import { VentaPort } from "src/app/config/puertos/venta-puertos/venta-ports";

@Injectable({
  providedIn: 'root'
})
export class VentaUseCase {

  constructor (private _ventaPort: VentaPort) {}

  postVentaProducto(
    id_vendedor: string,
    id_sucursal: number,
    fecha_venta: string,
    total_venta: string,
    subtotal: string,
    iva: string,
    detallesVenta: any[]
  ): Observable<venta_Entity> {
    return this._ventaPort.postVenta(
      id_vendedor,
      id_sucursal,
      fecha_venta,
      total_venta,
      subtotal,
      iva,
      detallesVenta
    );
  }

}
