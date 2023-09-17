import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { EscanerUseCase } from '../../domain/escaner-domain/client/escaner-usecase';

export interface Agregar_Producto {
  ID: string;
  Nombre: string;
  Precio: string;
}

export interface Producto {
  ID: string;
  Nombre: string;
  Precio: string;
  Descripcion: string;
  Imagen: string;
  Marca: string;
  Categoria: string;
}


@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.component.html',
  styleUrls: ['./escaner.component.scss'],
})
export class EscanerComponent implements OnInit {
  public id_Producto_Input: string = '';

  public producto_Encontrado: Producto | any = [];
  private producto_Mostar: Producto | undefined;
  private producto_Agregar: Agregar_Producto | undefined;

  public Mostrar_Producto = false;
  public mensaje_Aviso: string = '';
  public mostrar_Mensaje_Aviso = false;

  productosVenta: Agregar_Producto | any = [];

  constructor(
    private http: HttpClient,
    private _escanerUseCase: EscanerUseCase
  ) {}

  async ngOnInit() {
  }

  limpiar_Input() {
    this.id_Producto_Input = '';
  }

  async buscar_Producto() {
    if (this.id_Producto_Input.trim() === '') {
      this.mensaje_Aviso = 'Por favor, ingresa un término de búsqueda.';
    } else {
      let obtener_busqueda: Producto | boolean = await this.buscar_Producto_BD(
        this.id_Producto_Input
      );
      if (obtener_busqueda === false) {
        this.mensaje_Aviso = 'No se encontró el producto';
        this.Mostrar_Producto = false;
        this.producto_Encontrado = [];
      } else {
        this.Mostrar_Producto = true;
        this.producto_Encontrado = obtener_busqueda;
      }
    }

    this.mostrar_Mensaje_Aviso = true;
    setTimeout(() => {
      this.mostrar_Mensaje_Aviso = false;
    }, 2000);
  }

  async buscar_Producto_BD(producto_deseado: string) {
    try {
      const busquedaProducto_obtenido: any = await this._escanerUseCase
        .getProductoEscaneado(producto_deseado)
        .toPromise();

      if (busquedaProducto_obtenido && busquedaProducto_obtenido.length > 0) {
        return busquedaProducto_obtenido;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error al buscar producto:', error);
      return false;
    }
  }

  agregar_VentaProducto() {
      const productoAgregado: Agregar_Producto = {
        ID: this.producto_Encontrado.ID,
        Nombre: this.producto_Encontrado.Nombre,
        Precio: this.producto_Encontrado.Precio,
        // Agrega otros campos si es necesario
      };
      this.productosVenta.push(productoAgregado);

      // Limpia el producto encontrado después de agregarlo
      this.producto_Encontrado = null;

    this.id_Producto_Input = '';
  }

  eliminar_VentaProducto(producto: any): void {
    const index = this.productosVenta.indexOf(producto);
    if (index !== -1) {
      this.productosVenta.splice(index, 1);
    }
  }
}
