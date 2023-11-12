import { Observable } from "rxjs";
import { venta_Entity } from "src/app/domain/venta-domain/models/venta.entity";

export abstract class VentaPort {
  abstract postVenta(
    id_vendedor: string,
    id_sucursal: number,
    fecha_venta: string,
    total_venta: string,
    subtotal: string,
    iva: string,
    detallesVenta: any[]
  ): Observable<venta_Entity>;
  abstract getVentas(fecha: string): Observable<any>;
  abstract getFechaVentas(): Observable<any>;
  abstract getDetalleVenta(id: number): Observable<any>;
  abstract getInfoReporte(año: number, mes: number): Observable<any>;
}

