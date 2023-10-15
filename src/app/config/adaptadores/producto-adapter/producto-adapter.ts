import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { producto_Entity } from 'src/app/domain/producto-domain/models/producto.entity';
import { ProductoPort } from '../../puertos/producto-puertos/producto-puerto';

@Injectable({
  providedIn: 'root'
})

export class ProductoAdapter implements ProductoPort {
  apiUrl = environment.url + "/productos/";

  constructor(private http: HttpClient) { }

  postProducto(producto: any | []): Observable<producto_Entity> {
    return this.http.post<producto_Entity>(this.apiUrl, producto);
  }

  getProducto(): Observable<producto_Entity[]> {
    return this.http.get<producto_Entity[]>(this.apiUrl);
  }

  deleteProducto(productoID: string): Observable<producto_Entity> {
    return this.http.delete<producto_Entity>(this.apiUrl + productoID);
  }

  putProducto(producto: any | []): Observable<producto_Entity> {
    return this.http.put<producto_Entity>(this.apiUrl, producto);
  }

  getProductoID(productoID: string): Observable<producto_Entity> {
    return this.http.get<producto_Entity>(this.apiUrl + productoID);
  }
}
