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

  postProducto(
    nombre: string,
    precio: string,
    cantidad: string,
    descripcion: string,
    imagen: string,
    id_marca: string,
    id_categoria: string,
    id_proveedor: string,
    id_animal: string,
    id_tipoCantidad: string,
    codigo_barras: string,
    precio_granel: string,
    venta_granel: boolean,
  ): Observable<producto_Entity> {
    return this.http.post<producto_Entity>(this.apiUrl, {
      nombre,
      precio,
      cantidad,
      descripcion,
      imagen,
      id_marca,
      id_categoria,
      id_proveedor,
      id_animal,
      id_tipoCantidad,
      codigo_barras,
      precio_granel,
      venta_granel,
    }
    );
  }

  getProducto(): Observable<producto_Entity[]> {
    return this.http.get<producto_Entity[]>(this.apiUrl);
  }

  deleteProducto(productoID: string): Observable<producto_Entity> {
    return this.http.delete<producto_Entity>(this.apiUrl + productoID);
  }

  putProducto(
    nombre: string,
    precio: string,
    cantidad: string,
    descripcion: string,
    imagen: string,
    id_marca: string,
    id_categoria: string,
    id_proveedor: string,
    id_animal: string,
    id_tipoCantidad: string,
    codigo_barras: string,
    precio_granel: string,
    venta_granel: boolean,
    id_producto: any): Observable<producto_Entity> {
    return this.http.put<producto_Entity>(this.apiUrl + id_producto, {
      nombre,
      precio,
      cantidad,
      descripcion,
      imagen,
      id_marca,
      id_categoria,
      id_proveedor,
      id_animal,
      id_tipoCantidad,
      codigo_barras,
      precio_granel,
      venta_granel,
    });
  }

  getProductoID(productoID: string): Observable<producto_Entity> {
    return this.http.get<producto_Entity>(this.apiUrl + productoID);
  }
}
