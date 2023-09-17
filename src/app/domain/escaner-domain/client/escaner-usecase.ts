import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { escaner } from "../models/escaner.entity";
import { EscanerPort } from "src/app/config/puertos/escaner-puertos/escaner-ports";

@Injectable({
  providedIn: 'root'
})
export class EscanerUseCase {

  constructor (private _escanerPort: EscanerPort) {}

  getProductoEscaneado(producto_escaneadoID: string): Observable<escaner> {
    return this._escanerPort.getEscaner(producto_escaneadoID);
  }

}
