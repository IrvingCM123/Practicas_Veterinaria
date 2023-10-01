import { Component, OnInit } from '@angular/core';
import { VentaUseCase } from 'src/app/domain/historial-domain/client/venta-usecase';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent implements OnInit {
  constructor(private _ventaUseCase: VentaUseCase) {}

  public fecha: any;
  public Array_Fecha: any = [];
  public Array_Venta: any = [];
  public Datos_Recibidos: boolean = false;

  async ngOnInit() {
    try {
      // Realiza la solicitud para obtener la respuesta
      const response = await this._ventaUseCase
        .getFechasVentaRegistrada()
        .toPromise();

      // Verifica que response sea un objeto con la propiedad 'nombresDocumentos'
      if (
        typeof response === 'object' &&
        Array.isArray(response.nombresDocumentos)
      ) {
        // Obtén los nombres de documentos del campo 'nombresDocumentos'
        this.Array_Fecha = response.nombresDocumentos;
      } else {
        console.error(
          'La respuesta no contiene la propiedad "nombresDocumentos":',
          response
        );
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  async seleccionarFecha() {
    try {
      const resultado = await this._ventaUseCase
        .getVentaRegistrada(this.fecha)
        .toPromise();

      // Verificamos que los datos sean válidos antes de asignarlos al array
      if (resultado && resultado.datosDocumento) {
        this.Array_Venta = resultado.datosDocumento;
        this.Datos_Recibidos = true;
        console.log(this.Array_Venta);
      } else {
        // Manejo de error si los datos no son válidos
        console.error('Datos de venta no válidos:', resultado);
      }
    } catch (error) {
      // Manejo de error si la solicitud falla
      console.error('Error al obtener la venta:', error);
    }
  }
}
