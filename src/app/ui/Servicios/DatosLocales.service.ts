import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Datos_Locales {
  private almacenarDatosQRObservable = new Subject<any>();
  private Habilitar_Desabilitar_Camara = new BehaviorSubject<boolean>(
    localStorage.getItem('Camara') === 'true'
  );

  obtener_DatoLocal(indice: string): any {
    return localStorage.getItem(indice);
  }

  guardar_DatoLocal(indice: string, valor: any): void {
    localStorage.setItem(indice, valor);
    this.almacenarDatosQRObservable.next(valor);
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

  Lista_Datos_QR_Observable(): Observable<any> {
    return this.almacenarDatosQRObservable.asObservable();
  }

  Habilitar_Desabilitar_Camara_Observable(): Subject<boolean> {
    return this.Habilitar_Desabilitar_Camara;
  }

  obtenerDatosQR(): any[] {
    return JSON.parse(this.obtener_DatoLocal('almacenarDatosQR')) || [];
  }

  eliminarDatosAlFinalizarDia(): void {
    const ahora = new Date();
    const finDelDia = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + 1, 0, 0, 0);
    const tiempoRestante = finDelDia.getTime() - ahora.getTime();

    setTimeout(() => {
      this.eliminar_DatoLocal('almacenarDatosQR');
    }, tiempoRestante);
  }
}
