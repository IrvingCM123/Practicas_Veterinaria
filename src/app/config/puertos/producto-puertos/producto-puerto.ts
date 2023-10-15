import { Observable } from "rxjs";
import { producto_Entity } from "src/app/domain/producto-domain/models/producto.entity";

export abstract class ProductoPort {
  abstract postProducto(producto: any | []): Observable<producto_Entity>;
  abstract getProducto(): Observable<producto_Entity[]>;
  abstract deleteProducto(productoID: string): Observable<producto_Entity>;
  abstract putProducto(producto: any | [], id_producto: any): Observable<producto_Entity>;
  abstract getProductoID(productoID: string): Observable<producto_Entity>;
}
