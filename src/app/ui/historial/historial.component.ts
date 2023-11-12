import { Component, OnInit } from '@angular/core';
import { VentaUseCase } from 'src/app/domain/venta-domain/client/venta-usecase';
import { ReporteadorPDFService } from './reporteador.component.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent implements OnInit {
  constructor(
    private _ventaUseCase: VentaUseCase,
    private _reporteadorPDFService: ReporteadorPDFService
  ) {}

  // Propiedades públicas para almacenar datos y controlar la interfaz de usuario
  public fecha: any;
  public Array_Fecha: any = [];
  public Array_Venta: any = [];
  public Datos_Recibidos: boolean = false;

  public Mostrar_Detalle: boolean = false;
  public Array_Detalle: any = [];
  public ID_Detalle: string = '';

  async ngOnInit() {
    try {
      // Realiza la solicitud para obtener la respuesta
      const response = await this._ventaUseCase.getFechaVentas().toPromise();

      // Verifica que response sea un objeto con la propiedad 'nombresDocumentos'
      if (typeof response === 'object' && Array.isArray(response)) {
        // Obtén los nombres de documentos del campo 'nombresDocumentos'
        this.Array_Fecha = response;
      } else {
        // Manejo de error si la respuesta no contiene la propiedad 'nombresDocumentos'
        console.error(
          'La respuesta no contiene la propiedad "nombresDocumentos":',
          response
        );
      }
    } catch (error) {
      // Manejo de error si la solicitud falla
      console.error('Error al obtener los datos:', error);
    }
  }

  async seleccionarFecha() {
    try {
      const resultado = await this._ventaUseCase
        .getVentas(this.fecha)
        .toPromise();

      // Verificamos que los datos sean válidos antes de asignarlos al array
      if (resultado && resultado) {
        // Asigna los datos de venta recibidos al array Array_Venta
        this.Array_Venta = resultado;

        // Marca la bandera Datos_Recibidos como verdadera
        this.Datos_Recibidos = true;

        // Muestra los datos en la consola para verificar
        console.log(this.Array_Venta);
      } else {
        // Manejo de error si los datos de venta no son válidos
        console.error('Datos de venta no válidos:', resultado);
      }
    } catch (error) {
      // Manejo de error si la solicitud falla
      console.error('Error al obtener la venta:', error);
    }
  }

  handleSelectChange(event: Event) {
    // Obtén una referencia al select
    const select = event.target as HTMLSelectElement;

    // Si se selecciona una opción (diferente de "Selecciona una fecha")
    if (select.selectedIndex !== 0) {
      // Agrega una clase al select
      select.classList.add('selected');
    } else {
      // Si se selecciona la opción predeterminada, elimina la clase
      select.classList.remove('selected');
    }
  }

  async DetalleVenta(id_venta: number | any) {
    if (this.Mostrar_Detalle) {
      this.Mostrar_Detalle = false;
    } else {
      this.Mostrar_Detalle = true;
      this.ID_Detalle = id_venta;
      let resultado = await this._ventaUseCase
        .getDetalleVenta(id_venta)
        .toPromise();
      this.Array_Detalle = resultado;
    }
  }

  async GenerarReporteMensual() {

    let informacion_reporte = await this._ventaUseCase
      .getInfoReporte(2023, 11)
      .toPromise();

    let mes: any = 11;
    mes = calcularMes(mes);
    let año = 2023;

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
