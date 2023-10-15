import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InventarioPort } from '../../puertos/inventario-puertos/inventario-ports';
import { Inventario } from 'src/app/domain/inventario-domain/models/inventario.entity';

@Injectable({
  providedIn: 'root'
})

export class InventarioAdapter implements InventarioPort {
  apiUrl = environment.url + "/inventario/";

  constructor(private http: HttpClient) { }

  postProducto(producto: any | []): Observable<Inventario> {
    console.log(producto);
    return this.http.post<Inventario>(this.apiUrl, producto);
  }

  getProducto(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(this.apiUrl);
  }

  deleteProducto(productoID: string): Observable<Inventario> {
    return this.http.delete<Inventario>(this.apiUrl + productoID);
  }

  putProducto(producto: any | [], id_producto: any): Observable<Inventario> {
    return this.http.put<Inventario>(this.apiUrl + id_producto, producto);
  }

  getProductoID(productoID: string): Observable<Inventario> {
    return this.http.get<Inventario>(this.apiUrl + productoID);
  }


}
