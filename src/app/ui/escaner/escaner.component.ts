import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { EscanerUseCase } from '../../domain/escaner-domain/client/escaner-usecase';

@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.component.html',
  styleUrls: ['./escaner.component.scss'],
})

export class EscanerComponent implements OnInit {
  searchTerm: string = '';
  message: string = '';
  response$: any;
  productos: any = [];

  productosVenta: any = [
    { id: 1, nombre: 'Producto 1', precio: 10, cantidad: 1 },
    { id: 2, nombre: 'Producto 2', precio: 15, cantidad: 1 },
  ];

  constructor(
    private http: HttpClient,
    private _escanerUseCase: EscanerUseCase
  ) {}

  clearSearch() {
    this.searchTerm = '';
  }

  async search() {
    if (this.searchTerm.trim() === '') {
      this.message = 'Por favor, ingresa un término de búsqueda.';
    } else {
      console.log(this.searchTerm)
      this.response$ = await this._escanerUseCase.getProductoEscaneado(this.searchTerm);
      this.response$.subscribe((data: any) => {
        this.productos = data
      });
    }


    console.log(this.productos);
  }

  agregar() {
    this.productosVenta.push(
      this.productos.id,
      this.productos.nombre,
      this.productos.precio,
      this.productos.marca
    );

    this.searchTerm = '';
  }

  async ngOnInit() {}

  eliminarProducto(producto: any): void {
    const index = this.productosVenta.indexOf(producto);
    if (index !== -1) {
      this.productosVenta.splice(index, 1);
    }

    console.log(this.productosVenta);
  }

}
