import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VentaPort } from '../../puertos/venta-puertos/venta-ports';
import { venta_Entity } from 'src/app/domain/venta-domain/models/venta.entity';

@Injectable({
  providedIn: 'root',
})
export class VentasAdapter implements VentaPort {
  apiUrl = environment.url + '/venta/';
  api_url = environment.url;

  constructor(private http: HttpClient) {}

  postVenta(
    id_vendedor: string,
    id_sucursal: number,
    fecha_venta: string,
    total_venta: string,
    subtotal: string,
    iva: string,
    detallesVenta: any[]
  ): Observable<venta_Entity> {
    console.log(
      'adapter',
      id_vendedor,
      id_sucursal,
      fecha_venta,
      total_venta,
      subtotal,
      iva,
      detallesVenta
    );
    return this.http.post<any>(`${this.apiUrl}`, {
      id_vendedor,
      id_sucursal,
      fecha_venta,
      total_venta,
      subtotal,
      iva,
      detallesVenta,
    });
  }

  getVentas(fecha: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers: headers };

    return this.http.get<any>(
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

    return this.http.get<any>(
      `${this.api_url}` + '/venta/fechas/',
      httpOptions
    );
  }

  getVentasPorMes(mes: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get<any>(
      `${this.api_url}` + '/venta/fechas/mes/' + mes,
      httpOptions
    );
  }

  getDetalleVenta(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers: headers };

    return this.http.get<any>(
      `${this.api_url}` + '/detalleVenta/venta/' + id,
      options
    );
  }

  getInfoReporte(año: number, mes: number): Observable<any> {
    return this.http.post<any>(`${this.api_url}` + '/venta/reporte/mensual/', {
      año,
      mes,
    });
  }
}
