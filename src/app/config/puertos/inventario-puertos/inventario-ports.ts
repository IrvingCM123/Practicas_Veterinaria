import { Observable } from "rxjs";
import { Inventario } from "src/app/domain/inventario-domain/models/inventario.entity";

export abstract class InventarioPort {
  abstract postProducto(producto: any | []): Observable<Inventario>;
  abstract getProducto(): Observable<Inventario[]>;
  abstract deleteProducto(productoID: string): Observable<Inventario>;
  abstract putProducto(producto: any | [], id_producto: any): Observable<Inventario>;
  abstract getProductoID(productoID: number): any;
}

