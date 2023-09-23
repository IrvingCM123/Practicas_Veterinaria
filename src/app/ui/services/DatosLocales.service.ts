import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Datos_Locales {

  private almacenarDatosProductosObservable = new Subject<any>();


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

  guardar_ArregloLocal(indice: string, valor: any): void {
    const arreglo_Local = JSON.parse(this.obtener_DatoLocal(indice)) || [];
    arreglo_Local.push(valor);
    this.guardar_DatoLocal(indice, JSON.stringify(arreglo_Local));
  }

  Lista_Datos_Productos_Observable(): Observable<any> {
    return this.almacenarDatosProductosObservable.asObservable();
  }
}
