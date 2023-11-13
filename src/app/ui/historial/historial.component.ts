import { Component, OnInit } from '@angular/core';
import { VentaUseCase } from 'src/app/domain/venta-domain/client/venta-usecase';
import { ReporteadorPDFService } from './reporteador.component.service';

import { TypeAlert } from 'src/app/helpers/TypeAlert.service';
import { Mensajes_Reportes } from 'src/app/helpers/Message.service';

import { NgZone } from '@angular/core';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent implements OnInit {
  constructor(
    private _ventaUseCase: VentaUseCase,
    private _reporteadorPDFService: ReporteadorPDFService,
    private zone: NgZone
  ) {}

  public fecha: any;

  public Mes_Escogido_Venta: any = 0;
  public Mes_Escogido: boolean = false;
  public Escoger_Mes: any = [];

  public Array_Fecha: any = [];
  public Array_Venta: any = [];
  public Datos_Recibidos: boolean = false;

  public Mostrar_Detalle: boolean = false;
  public Array_Detalle: any = [];
  public ID_Detalle: string = '';

  public MensajeAlertaPantalla: string = '';
  public MostrarAlertaPantalla: boolean = false;
  public TipoAlertaPantalla: string = '';

  public Mostrar_Botones = false;

  async ngOnInit() {
    this.ArregloMeses();
  }

  async MostrarMesesVenta(mes: number) {
    this.MostrarAlertaPantalla = true;
    this.MensajeAlertaPantalla = Mensajes_Reportes.Cargando_Fechas;
    this.TipoAlertaPantalla = TypeAlert.Alert_Loading;
    let response: any = null;

    try {
      response = await this._ventaUseCase.getVentasPorMes(mes).toPromise();

      if (typeof response === 'object' && Array.isArray(response)) {
        this.Array_Fecha = response;
        this.Mes_Escogido = true;
        this.Datos_Recibidos = true;
      }
    } catch (error) {
      this.MensajeAlertaPantalla = Mensajes_Reportes.Cargando_Fechas_Error;
      this.TipoAlertaPantalla = TypeAlert.Alert_Error;
      this.MostrarAlertaPantalla = true;
      this.Mostrar_Botones = false;
      setTimeout(() => {
        this.MostrarAlertaPantalla = false;
      }, 1000);
    } finally {
      if (
        response === null ||
        response === undefined ||
        response === '' ||
        response.length === 0
      ) {
        this.MensajeAlertaPantalla = Mensajes_Reportes.Fechas_Vacias;
        this.TipoAlertaPantalla = TypeAlert.Alert_Error;
        this.MostrarAlertaPantalla = true;

        setTimeout(() => {
          this.MostrarAlertaPantalla = false;
        }, 1000);
      } else {
        this.MensajeAlertaPantalla = Mensajes_Reportes.Cargando_Fechas;
        this.TipoAlertaPantalla = TypeAlert.Alert_Success;
        this.Mostrar_Botones = true;
        this.MostrarAlertaPantalla = true;
        setTimeout(() => {
          this.MostrarAlertaPantalla = false;
        }, 1000);
      }
    }
  }

  async seleccionarFecha() {
    this.MostrarAlertaPantalla = true;
    this.MensajeAlertaPantalla = Mensajes_Reportes.Cargando_Ventas;
    this.TipoAlertaPantalla = TypeAlert.Alert_Loading;
    let errorOcurrido = false;

    try {
      const resultado = await this._ventaUseCase
        .getVentas(this.fecha)
        .toPromise();

      if (resultado && resultado) {
        this.Array_Venta = resultado;
        this.Datos_Recibidos = true;
      }
    } catch (error) {
      errorOcurrido = true;
      this.MensajeAlertaPantalla = Mensajes_Reportes.Cargando_Ventas_Error;
      this.TipoAlertaPantalla = TypeAlert.Alert_Error;
      this.MostrarAlertaPantalla = true;
      setTimeout(() => {
        this.MostrarAlertaPantalla = false;
      }, 1000);
    } finally {
      if (!errorOcurrido) {
        this.MensajeAlertaPantalla = Mensajes_Reportes.Cargando_Ventas;
        this.TipoAlertaPantalla = TypeAlert.Alert_Success;
        this.MostrarAlertaPantalla = true;
        setTimeout(() => {
          this.MostrarAlertaPantalla = false;
        }, 1000);
      }
    }
  }

  handleSelectChange(event: Event) {
    const select = event.target as HTMLSelectElement;

    if (select.selectedIndex !== 0) {
      select.classList.add('selected');
    } else {
      select.classList.remove('selected');
    }
  }

  async DetalleVenta(id_venta: number | any) {
    if (this.Mostrar_Detalle) {
      this.Mostrar_Detalle = false;
    } else {
      this.MostrarAlertaPantalla = true;
      this.MensajeAlertaPantalla = Mensajes_Reportes.Cargando_Detalle_Venta;
      this.TipoAlertaPantalla = TypeAlert.Alert_Loading;
      let errorOcurrido = false;
      let resultado: any = null;
      try {
        this.Mostrar_Detalle = true;
        this.ID_Detalle = id_venta;
        resultado = await this._ventaUseCase
          .getDetalleVenta(id_venta)
          .toPromise();
        this.Array_Detalle = resultado;
      } catch (error) {
        errorOcurrido = true;
        this.MensajeAlertaPantalla =
          Mensajes_Reportes.Cargando_Detalle_Venta_Error;
        this.TipoAlertaPantalla = TypeAlert.Alert_Error;
        this.MostrarAlertaPantalla = true;
        setTimeout(() => {
          this.MostrarAlertaPantalla = false;
        }, 1000);
      } finally {
        if (!errorOcurrido) {
          this.MensajeAlertaPantalla =
            Mensajes_Reportes.Cargando_Detalle_Venta;
          this.TipoAlertaPantalla = TypeAlert.Alert_Success;
          this.MostrarAlertaPantalla = true;
          setTimeout(() => {
            this.MostrarAlertaPantalla = false;
          }, 1000);
        } else if (resultado === null || resultado === undefined || resultado === '' || resultado.length === 0) {
          this.MensajeAlertaPantalla =
            Mensajes_Reportes.Cargando_Detalle_Venta_Vacio;
          this.TipoAlertaPantalla = TypeAlert.Alert_Error;
          this.MostrarAlertaPantalla = true;
          setTimeout(() => {
            this.MostrarAlertaPantalla = false;
          }, 1000);
        }
      }
    }
  }

  async GenerarReporteMensual() {
    let errorOcurrido = false;
    let año_actual = new Date().getFullYear();

    this.MensajeAlertaPantalla = Mensajes_Reportes.Reporte_Generado_Cargando;
    this.MostrarAlertaPantalla = true;
    this.TipoAlertaPantalla = TypeAlert.Alert_Loading;

    try {
      this.zone.run(async () => {

      let informacion_reporte = await this._ventaUseCase
        .getInfoReporte(año_actual, this.Mes_Escogido_Venta)
        .toPromise();

      let mes: any = this.Mes_Escogido_Venta;
      mes = calcularMes(mes);
      let año = año_actual;

      let nombre_documento = `${mes}-${año}`;

      const PDF_Reporte = await this._reporteadorPDFService.generarReporte(
        nombre_documento,
        informacion_reporte
      );

      let nombre_Archivo = `Reporte de Ventas ${mes}-${año}`;

      const archivoPDF = new Blob([PDF_Reporte], { type: 'application/pdf' });
      const url_ArchivodPDF = window.URL.createObjectURL(archivoPDF);
      const Link_Descarga_PDF = document.createElement('a');
      Link_Descarga_PDF.href = url_ArchivodPDF;
      Link_Descarga_PDF.download = nombre_Archivo;
      Link_Descarga_PDF.click();
      });
    } catch (error) {
      errorOcurrido = true;
      this.MensajeAlertaPantalla = Mensajes_Reportes.Reporte_Generado_Error;
      this.TipoAlertaPantalla = TypeAlert.Alert_Error;
      this.MostrarAlertaPantalla = true;

      setTimeout(() => {
        this.MostrarAlertaPantalla = false;
      }, 1000);
    } finally {
      if (!errorOcurrido) {
        this.MensajeAlertaPantalla = Mensajes_Reportes.Reporte_Generado_Success;
        this.TipoAlertaPantalla = TypeAlert.Alert_Success;
        this.MostrarAlertaPantalla = true;

        setTimeout(() => {
          this.MostrarAlertaPantalla = false;
        }, 1000);
      }
    }
  }

  ArregloMeses() {
    this.Escoger_Mes = [
      {
        id: 1,
        nombre: 'Enero',
      },
      {
        id: 2,
        nombre: 'Febrero',
      },
      {
        id: 3,
        nombre: 'Marzo',
      },
      {
        id: 4,
        nombre: 'Abril',
      },
      {
        id: 5,
        nombre: 'Mayo',
      },
      {
        id: 6,
        nombre: 'Junio',
      },
      {
        id: 7,
        nombre: 'Julio',
      },
      {
        id: 8,
        nombre: 'Agosto',
      },
      {
        id: 9,
        nombre: 'Septiembre',
      },
      {
        id: 10,
        nombre: 'Octubre',
      },
      {
        id: 11,
        nombre: 'Noviembre',
      },
      {
        id: 12,
        nombre: 'Diciembre',
      },
    ];
  }
}

export function calcularMes(mes: number) {
  // Convertir mes a nombre
  let nombre_mes: string = '';

  switch (mes) {
    case 1:
      nombre_mes = 'Enero';
      break;
    case 2:
      nombre_mes = 'Febrero';
      break;
    case 3:
      nombre_mes = 'Marzo';
      break;
    case 4:
      nombre_mes = 'Abril';
      break;
    case 5:
      nombre_mes = 'Mayo';
      break;
    case 6:
      nombre_mes = 'Junio';
      break;
    case 7:
      nombre_mes = 'Julio';
      break;
    case 8:
      nombre_mes = 'Agosto';
      break;
    case 9:
      nombre_mes = 'Septiembre';
      break;
    case 10:
      nombre_mes = 'Octubre';
      break;
    case 11:
      nombre_mes = 'Noviembre';
      break;
    case 12:
      nombre_mes = 'Diciembre';
      break;
    default:
      nombre_mes = 'Mes';
      break;
  }

  return nombre_mes;
}
