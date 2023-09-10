import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Datos_Locales } from './DatosLocales.service';

interface Estructura {
  Matricula: string;
  Nombre: string;
  Estado: string;
  Hora: string;
}

@Injectable({
  providedIn: 'root',
})
export class Escanear_Service {

  constructor(private datos_locales: Datos_Locales) {
    this.obtener = this.datos_locales.obtener_DatoLocal('almacenarDatosQR');
  }

  private obtener: any = '';
  private obtener_Datos: Estructura[] | any = [];
  private datos_Almacenados: any;
  private datos_Lista: Estructura[] | any[] = this.obtener ? JSON.parse(this.obtener) : [];

  almacenarDatosQR(
    matricula: string | any,
    nombre: string | any,
    status: string | any,
    hora: string | any
  ) {
    this.obtener_Datos = this.datos_locales.obtener_DatoLocal('almacenarDatosQR');
    this.datos_Almacenados = JSON.parse(this.obtener_Datos || '[]');

    const verificar_Existencia = this.datos_Almacenados.some((datos_buscar: Estructura) => {
      return (
        datos_buscar.Matricula === matricula &&
        datos_buscar.Nombre === nombre &&
        datos_buscar.Estado === status
      );
    });

    if (!verificar_Existencia) {
      const Agregar: Estructura = {
        Matricula: matricula,
        Nombre: nombre,
        Estado: status,
        Hora: hora,
      };
      this.datos_locales.guardar_ArregloLocal('almacenarDatosQR', Agregar);
      this.datos_Lista = JSON.parse(
        this.datos_locales.obtener_DatoLocal('almacenarDatosQR') || '[]'
      );
    }
  }

  obtenerDatosQR() {
    return this.datos_Lista;
  }
}
