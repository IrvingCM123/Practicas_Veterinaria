import { Observable } from "rxjs";
import { escaner } from "src/app/domain/escaner-domain/models/escaner.entity";

export abstract class EscanerPort {
  abstract getEscaner(producto_escaneadoID: string): Observable<escaner>;
}

