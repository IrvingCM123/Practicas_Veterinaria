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

  productosVenta: any = [
    { id: 1, nombre: 'Producto 1', precio: 10, cantidad: 1 },
    { id: 2, nombre: 'Producto 2', precio: 15, cantidad: 1 }
  ];


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
    this.productosVenta.push(this.searchTerm);
    this.searchTerm = '';
  }

  eliminarProducto(producto: any): void {
    const index = this.productosVenta.indexOf(producto);
    if (index !== -1) {
      this.productosVenta.splice(index, 1);
    }

    console.log(this.productosVenta)
  }

}
