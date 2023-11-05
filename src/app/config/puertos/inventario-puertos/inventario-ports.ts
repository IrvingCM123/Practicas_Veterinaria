import { Observable } from 'rxjs';
import { Inventario } from 'src/app/domain/inventario-domain/models/inventario.entity';

export abstract class InventarioPort {
  abstract postProducto(
    existencias: string | number,
    StockMinimo: string | number,
    StockMaximo: string | number,
    id_producto: any
  ): Observable<Inventario>;
  abstract getProducto(): Observable<Inventario[]>;
  abstract deleteProducto(productoID: string): Observable<Inventario>;
  abstract putProducto(
    existencias: string | number,
    StockMinimo: string | number,
    StockMaximo: string | number,
    id_producto: any
  ): Observable<Inventario>;
  abstract getProductoID(productoID: number): any;
}
