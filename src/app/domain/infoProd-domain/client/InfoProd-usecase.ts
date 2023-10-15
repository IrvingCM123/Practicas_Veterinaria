import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { InfoProdPort } from "src/app/config/puertos/infoProd-puertos/infoProd-ports";

@Injectable({
  providedIn: 'root'
})

export class InfoProdUseCase {

  constructor (private _infoProdPort: InfoProdPort) {}

  getMarcas(): Observable<any[]> {
    return this._infoProdPort.getMarcas();
  }
  getProveedores(): Observable<any[]> {
    return this._infoProdPort.getProveedores();
  }
  getCategorias(): Observable<any[]> {
    return this._infoProdPort.getCategorias();
  }
  getAnimales(): Observable<any[]> {
    return this._infoProdPort.getAnimales();
  }
  getTipoCantidad(): Observable<any[]> {
    return this._infoProdPort.getTipoCantidad();
  }

}


