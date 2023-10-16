import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Location } from '@angular/common';

import { ProductoUseCase } from 'src/app/domain/producto-domain/client/producto-usecase';
import { InventarioUseCase } from 'src/app/domain/inventario-domain/client/inventario-usecase';
import { InfoProdUseCase } from 'src/app/domain/infoProd-domain/client/InfoProd-usecase';

interface ProductoInterface {
  nombre: string;
  precio: string;
  cantidad: string;
  descripcion: string;
  url_imagen: string;
  nomenclaturaMarca: string;
  nomenclaturaCategoria: string;
  nomenclaturaProveedor: string;
  nomenclaturaAnimal: string;
  nomenclaturaTipoCantidad: string;
  precio_granel?: string | null;
  venta_granel: boolean;
  codigo: string | null;
}

interface InventarioInterface {
  id_producto: string;
  existencias: number;
  stock_minimo: number;
  stock_maximo: number;
}

interface InformacionInterface {
  id_informacion: number;
  nombre: string;
  nomenclatura: string;
}

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss'],
})
export class AgregarComponent implements OnInit {
  //Variables para crear un producto
  public nombre_producto: string | any = '';
  public descripcion_producto: string | any = '';
  public precio_producto: string | any = '';
  public marca_producto: string | any = '';
  public proveedor_producto: string | any = '';
  public categoria_producto: string | any = '';
  public animal_producto: string | any = '';
  public tipo_cantidad_producto: string | any = '';
  public url_imagen: string | any = '';
  public cantidad_producto: number | any = '';
  public precio_granel_producto: string | any = '';
  public venta_granel_producto: boolean | any = false;
  public codigo_barras_producto: string | any = '';

  //Variables para crear un inventario
  private id_producto: string | any;
  public existencias_producto: number | any = '';
  public stock_minimo_producto: number | any = '';
  public stock_maximo_producto: number | any = '';

  //Variable para almacenar una imagen
  public archivo_imagen: File | any = null;

  //Variables para obtener las marcas
  public marcas: InformacionInterface = {
    id_informacion: 0,
    nombre: '',
    nomenclatura: '',
  };

  public arreglo_marcas: [] | any = [];

  //Variable para obtener los proveedores
  public proveedores: InformacionInterface = {
    id_informacion: 0,
    nombre: '',
    nomenclatura: '',
  };

  public arreglo_proveedores: [] | any = [];

  //Variable para obtener las categorias
  public categorias: InformacionInterface | [] = {
    id_informacion: 0,
    nombre: '',
    nomenclatura: '',
  };

  public arrelo_categorias: [] | any = [];

  //Variable para obtener los animales
  public animales: InformacionInterface | [] = {
    id_informacion: 0,
    nombre: '',
    nomenclatura: '',
  };

  public arreglo_animales: [] | any = [];

  //Variable para obtener los tipos de cantidad
  public tipos_cantidad: InformacionInterface | [] = {
    id_informacion: 0,
    nombre: '',
    nomenclatura: '',
  };

  public arreglo_tipos_cantidad: [] | any = [];

  private Producto: ProductoInterface = {
    nombre: '',
    precio: '',
    cantidad: '',
    descripcion: '',
    url_imagen: '',
    nomenclaturaMarca: '',
    nomenclaturaCategoria: '',
    nomenclaturaProveedor: '',
    nomenclaturaAnimal: '',
    nomenclaturaTipoCantidad: '',
    precio_granel: '',
    venta_granel: false,
    codigo: null,
  };

  private Inventario: InventarioInterface = {
    id_producto: '',
    existencias: 0,
    stock_minimo: 0,
    stock_maximo: 0,
  };

  //Variables para mostrar los inputs
  public mostar_input_precio: boolean = false;
  public mostar_input_codigo: boolean = false;

  //Variables para el consentimiento
  public consentimiento: boolean = false;
  public botonHabilitado: boolean = false;

  //Variable para el id del producto
  public id_producto_inventario: string | any = '';

  //Variable para el loading
  loading: boolean = false;

  //Variable para el codigo de barras
  public codigoExistente: any;

  constructor(
    private storage: AngularFireStorage,
    private _productoUseCase: ProductoUseCase,
    private _location: Location,
    private _inventarioUseCase: InventarioUseCase,
    private _info: InfoProdUseCase
  ) {}

  ngOnInit(): void {
    this.LlenarDatos();
  }

  CrearProducto() {
    if (this.mostar_input_codigo == false) {
      this.codigo_barras_producto = this.GeneradorCodigoBarras();
    }

    this.Producto.nombre = this.nombre_producto;
    this.Producto.precio = this.precio_producto;
    this.Producto.cantidad = this.cantidad_producto;
    this.Producto.descripcion = this.descripcion_producto;
    this.Producto.url_imagen = this.url_imagen;
    this.Producto.nomenclaturaMarca = this.marca_producto;
    this.Producto.nomenclaturaCategoria = this.categoria_producto;
    this.Producto.nomenclaturaProveedor = this.proveedor_producto;
    this.Producto.nomenclaturaAnimal = this.animal_producto;
    this.Producto.nomenclaturaTipoCantidad = this.tipo_cantidad_producto;
    this.Producto.precio_granel = this.precio_granel_producto;
    this.Producto.venta_granel = this.venta_granel_producto;
    this.Producto.codigo = this.codigo_barras_producto;
  }

  GeneradorCodigoBarras(): string {
    // Genera un número aleatorio de 12 dígitos (código UPC)
    const randomNumber = Math.floor(100000000000 + Math.random() * 900000000000).toString();

    // Calcula el dígito de verificación (checksum)
    const digits = randomNumber.split('').map(Number);
    const evenSum = digits.filter((_, index) => index % 2 === 0).reduce((acc, curr) => acc + curr, 0);
    const oddSum = digits.filter((_, index) => index % 2 !== 0).reduce((acc, curr) => acc + curr, 0);
    const checksum = (10 - ((evenSum * 3 + oddSum) % 10)) % 10;

    // Crea el código EAN-13
    const ean13 = randomNumber + checksum;

    return ean13;
  }

  CrearProductoInventario(id_producto: string) {
    this.Inventario.id_producto = id_producto;
    this.Inventario.existencias = this.existencias_producto;
    this.Inventario.stock_minimo = this.stock_minimo_producto;
    this.Inventario.stock_maximo = this.stock_maximo_producto;
  }

  async GuardarProducto() {
    this.loading = true;
    try {
      await this.SubirImagenFirestore();
      this.CrearProducto();
      const response: any = await this._productoUseCase
        .postProducto(this.Producto)
        .toPromise();
      this.id_producto_inventario = response.id;
      await this.CrearProductoInventario(this.id_producto_inventario);
      await this._inventarioUseCase.postProducto(this.Inventario).toPromise();
    } catch (error) {
      console.error(error);
    }
    this.loading = false;
    window.location.reload();
  }

  async SubirImagenFirestore() {
    if (this.archivo_imagen) {
      const filePath = `images/${this.archivo_imagen.name}`;
      const fileRef = this.storage.ref(filePath);
      try {
        await this.storage.upload(filePath, this.archivo_imagen);
        const downloadUrl: any = await fileRef.getDownloadURL().toPromise();
        console.log('URL:', downloadUrl);
        this.url_imagen = downloadUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }

  GuardarImagen(event: any) {
    this.archivo_imagen = event.target.files[0];
    this.MostrarImagen(this.archivo_imagen);
  }

  MostrarImagen(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.url_imagen = e.target.result;
    };
    reader.readAsDataURL(file);
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
        console.log(response);
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

  actualizarNombre(event: Event): void {
    this.nombre_producto = (event.target as HTMLInputElement).value;
  }

  actualizarDescripcion(event: Event): void {
    this.descripcion_producto = (event.target as HTMLInputElement).value;
  }

  actualizarPrecio(event: Event): void {
    this.precio_producto = (event.target as HTMLInputElement).value;
  }

  actualizarMarca(event: Event): void {
    this.marca_producto = (event.target as HTMLInputElement).value;
  }

  actualizarProveedor(event: Event): void {
    this.proveedor_producto = (event.target as HTMLInputElement).value;
  }

  actualizarCategoria(event: Event): void {
    this.categoria_producto = (event.target as HTMLInputElement).value;
    console.log(this.categoria_producto);
  }

  actualizarAnimal(event: Event): void {
    this.animal_producto = (event.target as HTMLInputElement).value;
    console.log(this.animal_producto);

  }

  actualizarCantidad(event: Event): void {
    this.cantidad_producto = (event.target as HTMLInputElement).value;
  }

  actualizarTipoCantidad(event: Event): void {
    this.tipo_cantidad_producto = (event.target as HTMLInputElement).value;
  }

  actualizarExistencias(event: Event): void {
    this.existencias_producto = (event.target as HTMLInputElement).value;
  }

  actualizarStockMinimo(event: Event): void {
    this.stock_minimo_producto = (event.target as HTMLInputElement).value;
  }

  actualizarStockMaximo(event: Event): void {
    this.stock_maximo_producto = (event.target as HTMLInputElement).value;
  }

  actualizarPrecioGranel(event: Event): void {
    this.precio_granel_producto = (event.target as HTMLInputElement).value;
  }

  actualizarCodigo(event: Event): void {
    this.codigo_barras_producto = (event.target as HTMLInputElement).value;
  }

  actualizarVentaGranel(event: Event): void {
    this.venta_granel_producto = (event.target as HTMLInputElement).value;

    if (this.venta_granel_producto == 'true') {
      this.mostar_input_precio = true;
      this.venta_granel_producto = true;
    } else {
      this.mostar_input_precio = false;
      this.venta_granel_producto = false;
    }
  }

  actualizarCodigoBarras(event: Event): void {
    this.codigoExistente = (event.target as HTMLInputElement).value;

    if (this.codigoExistente == 'true') {
      this.mostar_input_codigo = true;
      this.codigoExistente = true;
    } else {
      this.mostar_input_codigo = false;
      this.codigoExistente = false;
    }
  }

  habilitarBoton() {
    this.botonHabilitado = this.consentimiento;
  }
}
