import { Observable } from "rxjs";
import { venta } from "src/app/domain/historial-domain/models/venta.entity";

export abstract class VentaPort {
  abstract postVenta(venta_Registrada: any | []): Observable<venta>;
}

