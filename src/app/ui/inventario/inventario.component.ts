import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datos_Locales } from '../services/DatosLocales.service';
import { forkJoin } from 'rxjs';

import { InfoProdUseCase } from 'src/app/domain/infoProd-domain/client/InfoProd-usecase';
import { ProductoUseCase } from 'src/app/domain/producto-domain/client/producto-usecase';


interface productoInterface {
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

interface InformacionInterface {
  id_informacion: number;
  nombre: string;
  nomenclatura: string;
}


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
})
export class InventarioComponent implements OnInit {


  //Variables para obtener las marcas
  public marcas: InformacionInterface = {
    id_informacion: 0,
    nombre: '',
    nomenclatura: ''
  };

  public arreglo_marcas: [] | any = [];

  //Variable para obtener los proveedores
  public proveedores: InformacionInterface = {
    id_informacion: 0,
    nombre: '',
    nomenclatura: ''
  };

  public arreglo_proveedores: [] | any = [];

  //Variable para obtener las categorias
  public categorias: InformacionInterface | [] = {
    id_informacion: 0,
    nombre: '',
    nomenclatura: ''
  };

  public arrelo_categorias: [] | any = [];

  //Variable para obtener los animales
  public animales: InformacionInterface | [] = {
    id_informacion: 0,
    nombre: '',
    nomenclatura: ''
  };

  public arreglo_animales: [] | any = [];

  //Variable para obtener los tipos de cantidad
  public tipos_cantidad: InformacionInterface | [] = {
    id_informacion: 0,
    nombre: '',
    nomenclatura: ''
  };

  public arreglo_tipos_cantidad: [] | any = [];

  constructor(
    private router: Router,
    private cache: Datos_Locales,
    private _productoUseCase: ProductoUseCase,
    private _info: InfoProdUseCase
  ) {}

  async ngOnInit() {
    await this.obtenerProductos();
    await this.LlenarDatos();
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
    const productosObservable = this._productoUseCase.getProducto();
    this.productos = await this._productoUseCase.getProducto().toPromise();
    const marcasObservable = this._info.getMarcas();
    const proveedoresObservable = this._info.getProveedores();
    const categoriasObservable = this._info.getCategorias();
    const animalesObservable = this._info.getAnimales();
    const tipoCantidadObservable = this._info.getTipoCantidad();

    forkJoin([
      productosObservable,
      marcasObservable,
      proveedoresObservable,
      categoriasObservable,
      animalesObservable,
      tipoCantidadObservable
    ]).subscribe(
      ([productos, marcas, proveedores, categorías, animales, tiposCantidad]) => {

        // Mapea el campo id_marca de productos al nombre correspondiente
        this.productos.forEach((producto: any) => {
          const marca = marcas.find((marca) => marca.id_marca === producto.id_marca);
          if (marca) {
            producto.id_marca = marca.nombre;
          }
        });

        // Mapea el campo id_proveedor de productos al nombre correspondiente
        this.productos.forEach((producto: any) => {
          const proveedor = proveedores.find((proveedor) => proveedor.id_proveedor === producto.id_proveedor);
          if (proveedor) {
            producto.id_proveedor = proveedor.nombre;
          }
        });

        // Mapea el campo id_categoria de productos al nombre correspondiente
        this.productos.forEach((producto: any) => {
          const categoria = categorías.find((categoria) => categoria.id_categoria === producto.id_categoria);
          if (categoria) {
            producto.id_categoria = categoria.nombre;
          }
        });

        // Mapea el campo id_animal de productos al nombre correspondiente
        this.productos.forEach((producto: any) => {
          const animal = animales.find((animal) => animal.id_categoria === producto.id_animal);
          if (animal) {
            producto.id_animal = animal.nombre;
          }
        });

        // Mapea el campo id_tipoCantidad de productos al nombre correspondiente
        this.productos.forEach((producto: any) => {
          const tipoCantidad = tiposCantidad.find((tipoCantidad) => tipoCantidad.id_tipoCantidad === producto.id_tipoCantidad);
          if (tipoCantidad) {
            producto.id_tipoCantidad = tipoCantidad.nombre;
          }
        });

        // Mapea el campo venta_granel de productos al nombre correspondiente
        this.productos.forEach((producto: any) => {
          if (producto.venta_granel) {
            producto.venta_granel = 'Si';
          } else {
            producto.venta_granel = 'No';
          }
        });

        this.marcasUnicas = this.obtenerMarcasUnicas();
                this.productosFiltradosMarcas = this.productos;
        this.productosFiltradosNombre = this.productos;
      },
      (error) => {
        console.error(error);
      }
    );
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
    console.log(this.productos)

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

  SeleccionarProducto(id_producto: string | number) {
    this.cache.guardar_DatoLocal('producto', id_producto);
    this.router.navigate(['/producto']);
  }


  async LlenarDatos() {
    await this._info.getMarcas().subscribe(
      (response: any) => {
        this.arreglo_marcas = response;
      },
      (error) => {
        console.log(error);
      }
    );

    this._info.getProveedores().subscribe(
      (response: any) => {
        this.arreglo_proveedores = response;
      },
      (error) => {
        console.log(error);
      }
    );

    this._info.getCategorias().subscribe(
      (response: any) => {
        this.arrelo_categorias = response;
      },
      (error) => {
        console.log(error);
      }
    );

    this._info.getAnimales().subscribe(
      (response: any) => {
        this.arreglo_animales = response;
      },
      (error) => {
        console.log(error);
      }
    );

    this._info.getTipoCantidad().subscribe(
      (response: any) => {
        this.arreglo_tipos_cantidad = response;
      },
      (error) => {
        console.log(error);
      }
    );

  }
}
