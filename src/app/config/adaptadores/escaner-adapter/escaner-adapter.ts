import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { EscanerPort } from "../../puertos/escaner-puertos/escaner-ports";
import { escaner } from "src/app/domain/escaner-domain/models/escaner.entity";

@Injectable({
  providedIn: 'root'
})
export class EscanerAdapter extends EscanerPort {

    api_url = environment.url + "/productosid/"

    constructor(private _http: HttpClient) {
      super();
    }

    getEscaner(producto_escaneadoID: string): Observable<escaner> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'mode': "cors",
          'Access-Control-Allow-Origin': '*',
          'credentials': 'include'
        })
      };
      console.log(this.api_url + producto_escaneadoID);
      return this._http.get<escaner>(this.api_url + producto_escaneadoID, httpOptions);
    }

  }
