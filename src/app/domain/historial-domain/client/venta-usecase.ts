import { venta } from './../models/venta.entity';
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { VentaPort } from 'src/app/config/puertos/venta-puertos/venta-ports';

@Injectable({
  providedIn: 'root'
})
export class VentaUseCase {

  constructor (private _ventaPort: VentaPort) {}

  postVentaRegistrada(venta: [] | any): Observable<[] | any> {
    return this._ventaPort.postVenta(venta);
  }

  getVentaRegistrada(fecha: string): Observable<any> {
    return this._ventaPort.getVentas(fecha);
  }

  getFechasVentaRegistrada(): Observable<any> {
    return this._ventaPort.getFechaVentas();
  }
  
}
