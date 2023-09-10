import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { Escanear_Service } from '../Servicios/EscanearQR.service';
import { Datos_Locales } from '../Servicios/DatosLocales.service';

@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.component.html',
  styleUrls: ['./escaner.component.scss']
})
export class EscanerComponent {

  searchTerm: string = '';
  message: string = '';

  constructor() { }

  clearSearch() {
    this.searchTerm = ''; // Borra el contenido del input
  }

  search() {
    if (this.searchTerm.trim() === '') {
      this.message = 'Por favor, ingresa un término de búsqueda.';
    } else {
      this.message = 'Buscando...'; // Puedes reemplazar esto con tu lógica real de búsqueda
    }
  }

}
