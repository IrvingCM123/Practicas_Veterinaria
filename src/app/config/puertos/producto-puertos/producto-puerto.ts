import { Observable } from "rxjs";
import { producto_Entity } from "src/app/domain/producto-domain/models/producto.entity";

export abstract class ProductoPort {
  abstract postProducto(
    nombre: string,
    precio: string,
    cantidad: string,
    descripcion: string,
    imagen: string,
    id_marca: string,
    idCategoria: string,
    idProveedor: string,
    idAnimal: string,
    id_tipoCantidad: string,
    codigoBarra: string,
    precio_granel: string,
    venta_granel: boolean,
  ): Observable<producto_Entity>;
  abstract getProducto(): Observable<producto_Entity[]>;
  abstract deleteProducto(productoID: string): Observable<producto_Entity>;
  abstract putProducto(
    nombre: string,
    precio: string,
    cantidad: string,
    descripcion: string,
    imagen: string,
    id_marca: string,
    idCategoria: string,
    idProveedor: string,
    idAnimal: string,
    id_tipoCantidad: string,
    codigoBarra: string,
    precio_granel: string,
    venta_granel: boolean,
    id_producto: any): Observable<producto_Entity>;
  abstract getProductoID(productoID: string): Observable<producto_Entity>;
}
