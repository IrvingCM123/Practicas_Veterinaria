import { Observable } from "rxjs";
import { venta_Entity } from "src/app/domain/venta-domain/models/venta.entity";

export abstract class VentaPort {
  abstract postVenta(venta: [] | any): Observable<venta_Entity>;
}

