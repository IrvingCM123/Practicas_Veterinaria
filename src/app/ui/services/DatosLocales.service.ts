import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Datos_Locales {

  obtener_DatoLocal(indice: string): any {
    return localStorage.getItem(indice);
  }

  guardar_DatoLocal(indice: string, valor: any): void {
    localStorage.setItem(indice, valor);
  }

  eliminar_DatoLocal(indice: string): void {
    localStorage.removeItem(indice);
  }

  actualizar_DatoLocal(indice: string, valor: any) {
    localStorage.setItem(indice, JSON.stringify(valor));
  }

  obtenerDatosQR(): any[] {
    return JSON.parse(this.obtener_DatoLocal('almacenarDatosQR')) || [];
  }

}
