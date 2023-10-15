import { ProductoUseCase } from 'src/app/domain/producto-domain/client/producto-usecase';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datos_Locales } from '../services/DatosLocales.service';

export interface productoInterface {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  id_marca: number;
  id_proveedor: number;
  id_categoria: number;
  id_animal: number;
  imagen: string;
  cantidad: string;
  id_tipoCantidad: number;
  venta_granel: boolean;
  precio_granel?: string | null;
}

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
})
export class InventarioComponent implements OnInit {

  constructor(
    private router: Router,
    private cache: Datos_Locales,
    private _productoUseCase: ProductoUseCase
  ) {}

  ngOnInit() {
    this.marcasUnicas = this.obtenerMarcasUnicas();
  }

  //Variable para almacenar los productos obtenidos de la base de datos
  public productos: any = [ ];

  //Variables para realizar los filtros de los productos
  public mostar_todos = true;
  public mostrar_marca = false;
  public mostrar_nombre = false;
  public marcaSeleccionada: string = 'Todas';

  //Variables para realizar el ordenamiento de los productos
  public ordenSeleccionado: string = 'Rango Precio';

  //Variables para realizar la busqueda de los productos
  public productosFiltradosMarcas: any[] = this.productos;
  public productosFiltradosNombre: any[] = this.productos;
  public marcasUnicas: string[] = [];
  public nombreProducto: string = '';

  async obtenerProductos() {
    await this._productoUseCase.getProducto().subscribe((data) => {
      this.productos = data;
      console.log(this.productos);
      this.productosFiltradosMarcas = this.productos;
      this.productosFiltradosNombre = this.productos;
    });
  }

  obtenerMarcasUnicas() {
    const marcasUnicas = new Set<string>();
    this.productos.forEach((producto: any) => {
      marcasUnicas.add(producto.id_marca);
    });
    return Array.from(marcasUnicas);
  }

  ordenarProductos() {
    if (this.ordenSeleccionado === 'mayor') {
      this.productos.sort(
        (a: any, b: any) => parseFloat(b.precio) - parseFloat(a.precio)
      );
    } else {
      this.productos.sort(
        (a: any, b: any) => parseFloat(a.precio) - parseFloat(b.precio)
      );
    }
  }

  filtrarPorMarca() {
    if (this.marcaSeleccionada === 'Todas') {
      this.productosFiltradosMarcas = this.productos;
      this.mostar_todos = true;
      this.mostrar_marca = false;
    } else {
      this.mostar_todos = false;
      this.mostrar_marca = true;
      this.productosFiltradosMarcas = this.productos.filter((producto: any) => {
        return producto.id_marca == this.marcaSeleccionada;
      });
    }
  }

  buscarPorNombre() {
    if (!this.nombreProducto) {
      this.mostar_todos = true;
      this.mostrar_nombre = false;
      this.productosFiltradosNombre = this.productos;
    } else {
      this.mostar_todos = false;
      this.mostrar_nombre = true;
      this.productosFiltradosNombre = this.productos.filter((producto: any) => {
        console.log(
          producto.nombre
            .toLowerCase()
            .includes(this.nombreProducto.toLowerCase())
        );
        return producto.nombre
          .toLowerCase()
          .includes(this.nombreProducto.toLowerCase());
      });
    }
  }

  SeleccionarProducto() {
    this.cache.guardar_ArregloLocal('producto', this.productosFiltradosNombre);
    this.router.navigate(['/producto']);
  }
}
