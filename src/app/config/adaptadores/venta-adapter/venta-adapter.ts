import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VentaPort } from '../../puertos/venta-puertos/venta-ports';
import { venta_Entity } from 'src/app/domain/venta-domain/models/venta.entity';

@Injectable({
  providedIn: 'root'
})
export class VentasAdapter implements VentaPort {
  apiUrl = environment.url + "/venta/";

  constructor(private http: HttpClient) { }
  getVentas(fecha: string): Observable<any> {
    throw new Error('Method not implemented.');
  }
  getFechaVentas(): Observable<any> {
    throw new Error('Method not implemented.');
  }

  postVenta(
    id_vendedor: string,
    id_sucursal: number,
    fecha_venta: string,
    total_venta: string,
    subtotal: string,
    iva: string,
    detallesVenta: any[]
  ): Observable<venta_Entity> {
    console.log("adapter",
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
    }
    );
  }



}
