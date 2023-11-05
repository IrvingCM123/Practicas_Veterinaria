import { venta } from './../models/venta.entity';
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { VentaPort } from 'src/app/config/puertos/venta-puertos/venta-ports';

@Injectable({
  providedIn: 'root'
})
export class VentaUseCase {

  constructor (private _ventaPort: VentaPort) {}

  postVentaRegistrada(
    id_vendedor: string,
    id_sucursal: number,
    fecha_venta: string,
    total_venta: string,
    subtotal: string,
    iva: string,
    detallesVenta: any[]
  ): Observable<[] | any> {
    console.log("usecase",
      id_vendedor,
      id_sucursal,
      fecha_venta,
      total_venta,
      subtotal,
      iva,
    );
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

  getVentaRegistrada(fecha: string): Observable<any> {
    return this._ventaPort.getVentas(fecha);
  }

  getFechasVentaRegistrada(): Observable<any> {
    return this._ventaPort.getFechaVentas();
  }

}
