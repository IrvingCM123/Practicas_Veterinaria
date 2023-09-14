import { Component, OnInit } from '@angular/core';

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

  producto_encontrado: any = [];
  productos: any = [];
  public Mostrar_Producto = false;
  public Mostrar_Mensaje_Escaneo = false;

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
      let busqueda = await this.buscar_Producto(this.searchTerm);
      if (busqueda === false) {
        this.message = 'No se encontró el producto';
        this.Mostrar_Producto = false;
      } else {
        this.Mostrar_Producto = true;
        this.producto_encontrado = busqueda;
        console.log(this.producto_encontrado);
      }
    }

    this.Mostrar_Mensaje_Escaneo = true;
    setTimeout(() => {
      this.Mostrar_Mensaje_Escaneo = false;
    }, 2000);
  }

  async buscar_Producto(objeto_buscar: string) {
    try {
      const response: any = await this._escanerUseCase
        .getProductoEscaneado(objeto_buscar)
        .toPromise();

      if (response && response.length > 0) {
        return response;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error al buscar producto:', error);
      return false;
    }
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
