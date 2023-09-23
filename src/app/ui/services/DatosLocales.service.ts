import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Datos_Locales {

  obtener_DatoLocal(indice: string): any {
    const valor = localStorage.getItem(indice);
    if (valor) {
      return JSON.parse(valor);
    } else {
      return null; // Si no existe el índice, devuelve null
    }
  }

  guardar_DatoLocal(indice: string, valor: any): void {
    const valorString = JSON.stringify(valor);
    localStorage.setItem(indice, valorString);
  }

  eliminar_DatoLocal(indice: string): void {
    localStorage.removeItem(indice);
  }

  actualizar_DatoLocal(indice: string, valor: any) {
    localStorage.setItem(indice, JSON.stringify(valor));
  }

}
