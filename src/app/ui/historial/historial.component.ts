import { Component, OnInit } from '@angular/core';
import { VentaUseCase } from 'src/app/domain/venta-domain/client/venta-usecase';
import { PdfService } from './reporteador.component.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent implements OnInit {
  constructor(
    private _ventaUseCase: VentaUseCase,
    private _pdfService: PdfService
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
    // Convertir json a pdf y descargar

    let json = this.Array_Venta;
    let json2 = this.Array_Detalle;

    console.log(json);

const pdfBytes = await this._pdfService.generatePdf("Mensual: Noviembre 2023",1000,json, json2);
// Descargar archivo
const blob = new Blob([pdfBytes], { type: 'application/pdf' });
const url = window.URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = 'reporte.pdf';
link.click();
  }
}
