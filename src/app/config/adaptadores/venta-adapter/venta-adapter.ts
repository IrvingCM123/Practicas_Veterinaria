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
  apiUrl = environment.url+"RegistrarUsuarios/";

  constructor(private http: HttpClient) {}
  getVentas(fecha: string): Observable<any> {
    throw new Error('Method not implemented.');
  }
  getFechaVentas(): Observable<any> {
    throw new Error('Method not implemented.');
  }

  postVenta(venta: any): Observable<venta_Entity> {
    return this.http.post<any>(`${this.apiUrl}`, venta);
  }



}
