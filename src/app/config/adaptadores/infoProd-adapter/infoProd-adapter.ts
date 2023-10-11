import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InfoProdPort } from '../../puertos/infoProd-puertos/infoProd-ports';

@Injectable({
  providedIn: 'root'
})

export class InfoProdAdapter implements InfoProdPort {
  apiUrl = environment.url;
  url_marca = this.apiUrl + "marcas";
  url_proveedor = this.apiUrl + "proveedores";
  url_categoria = this.apiUrl + "categorias";
  url_animal = this.apiUrl + "animales";
  url_tipoProducto = this.apiUrl + "tipoProductos";
  url_tipoCantidad = this.apiUrl + "tipoCantidades";

  constructor(private http: HttpClient) { }

  getMarcas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);

  }
  getProveedores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);

  }
  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);

  }
  getAnimales(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);

  }
  getTipoProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);

  }
  getTipoCantidad(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);

  }




}
