import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.component.html',
  styleUrls: ['./escaner.component.scss']
})
export class EscanerComponent {

  searchTerm: string = '';
  message: string = '';
  productos_venta: any[] = [];

  constructor() { }

  clearSearch() {
    this.searchTerm = '';
  }

  search() {
    if (this.searchTerm.trim() === '') {
      this.message = 'Por favor, ingresa un término de búsqueda.';
    } else {
      this.message = 'Buscando...';
    }
  }

  agregar() {
    console.log(this.searchTerm);
    this.productos_venta.push(this.searchTerm);
    this.searchTerm = '';
  }

}
