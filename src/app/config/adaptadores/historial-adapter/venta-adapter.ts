import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VentaPort } from '../../puertos/venta-puertos/venta-ports';

import { venta } from 'src/app/domain/historial-domain/models/venta.entity';

@Injectable({
  providedIn: 'root',
})
export class VentaAdapter extends VentaPort {
  api_url = environment.url;

  constructor(private _http: HttpClient) {
    super();
  }

  postVenta(venta: any): Observable<[] | any> {
    return this._http.post<any>(`${this.api_url}` + '/venta', venta);
  }

  getVentas(fecha: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers: headers };

    return this._http.get<any>(
      `${this.api_url}` + '/venta/fechas/' + fecha,
      options
    );
  }

  getFechaVentas(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this._http.get<any>(
      `${this.api_url}` + '/venta/fechas/',
      httpOptions
    );
  }

  getDetalleVenta(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers: headers };

    return this._http.get<any>(
      `${this.api_url}` + '/detalleVenta/venta/' + id,
      options
    );
  }

}
