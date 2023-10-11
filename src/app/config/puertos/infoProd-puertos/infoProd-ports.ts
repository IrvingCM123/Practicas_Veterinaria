import { Observable } from "rxjs";

export abstract class InfoProdPort {
  abstract getMarcas(): Observable<any[]>;
  abstract getProveedores(): Observable<any[]>;
  abstract getCategorias(): Observable<any[]>;
  abstract getAnimales(): Observable<any[]>;
  abstract getTipoProductos(): Observable<any[]>;
  abstract getTipoCantidad(): Observable<any[]>;
}
