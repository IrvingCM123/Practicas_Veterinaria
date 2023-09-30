import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { venta_Entity } from "../models/venta.entity";
import { VentaPort } from "src/app/config/puertos/venta-puertos/venta-ports";

@Injectable({
  providedIn: 'root'
})
export class VentaUseCase {

  constructor (private _ventaPort: VentaPort) {}

  postVentaProducto(venta_generada: [] | any): Observable<venta_Entity> {
    return this._ventaPort.postVenta(venta_generada);
  }

}
