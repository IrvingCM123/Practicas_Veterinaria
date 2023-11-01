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
  url_marca = this.apiUrl + "/marcas/";
  url_proveedor = this.apiUrl + "/proveedores/";
  url_categoria = this.apiUrl + "/categorias/";
  url_animal = this.apiUrl + "/animales/";
  url_tipoCantidad = this.apiUrl + "/tipoProducto/";

  constructor(private http: HttpClient) { }

  getMarcas(): Observable<any[]> {
    return this.http.get<any[]>(this.url_marca);

  }
  getProveedores(): Observable<any[]> {
    return this.http.get<any[]>(this.url_proveedor);

  }
  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.url_categoria);

  }
  getAnimales(): Observable<any[]> {
    return this.http.get<any[]>(this.url_animal);

  }

  getTipoCantidad(): Observable<any[]> {
    return this.http.get<any[]>(this.url_tipoCantidad);
  }




}
