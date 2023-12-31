import { Component, OnInit } from '@angular/core';
import { InventarioUseCase } from 'src/app/domain/inventario-domain/client/inventario-usecase';
import { Datos_Locales } from '../services/DatosLocales.service';
import { ProductoUseCase } from 'src/app/domain/producto-domain/client/producto-usecase';
import { InfoProdUseCase } from 'src/app/domain/infoProd-domain/client/InfoProd-usecase';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Subject, forkJoin } from 'rxjs';
import { Router } from '@angular/router';

import { Mensajes_Productos_Modificar } from 'src/app/helpers/Message.service';
import { TypeAlert } from 'src/app/helpers/TypeAlert.service';

interface InformacionInterface {
  id_informacion: number;
  nombre: string;
  nomenclatura: string;
}

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
  precio_granel?: string | null | any;
  venta_granel: boolean;
  codigo_barras: string;
}

interface InventarioInterface {
  id_producto: string;
  existencias: number;
  stock_minimo: number;
  stock_maximo: number;
}

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {
  constructor(
    private _inventarioUseCase: InventarioUseCase,
    private cache: Datos_Locales,
    private _info: InfoProdUseCase,
    private storage: AngularFireStorage,
    private _productoUseCase: ProductoUseCase,
    private router: Router
  ) {}

  //Variables para mostrar el producto
  public datos_producto: any = {
    id_producto: 0,
    nombre: '',
    precio: '',
    cantidad: '',
    descripcion: '',
    url_imagen: '',
    id_marca: 0,
    id_proveedor: 0,
    id_categoria: 0,
    id_animal: 0,
    id_tipoCantidad: 0,
    precio_granel: '',
    venta_granel: false,
    nomenclaturaMarca: '',
    nomenclaturaCategoria: '',
    nomenclaturaProveedor: '',
    nomenclaturaAnimal: '',
    nomenclaturaTipoCantidad: '',
  };

  public datos_inventario: any | [] = [];

  //Variables para modificar el producto
  public nuevos_datos_producto: any = [];
  public nuevos_datos_inventario: any = [];

  //Variable para mostrar el producto seleccionado
  private id_Producto_Input: string = '';

  //Variables para mensajes/Formularios
  public mostrar_Mensaje_Aviso = false;
  public mensaje_Aviso: string = '';
  public mostrar_formulario = false;

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
    codigo_barras: '',
  };

  private Inventario: InventarioInterface = {
    id_producto: '',
    existencias: 0,
    stock_minimo: 0,
    stock_maximo: 0,
  };

  public mostar_input_precio: boolean = false;
  public consentimiento: boolean = false;
  public botonHabilitado: boolean = false;
  public id_producto_inventario: string | any = '';

  //Variables para mostrar las alertas de los mensajes
  public MostrarAlertaPantalla: boolean = false;
  public TipoAlertaPantalla: string = '';
  public MensajeAlertaPantalla: string = '';

  //Variable para difuminar la pantalla
  public OcultarPantalla: boolean = false;

  ngOnInit(): void {
    this.id_Producto_Input = this.cache.obtener_DatoLocal('producto');
    this.LlenarDatos();
    this.buscar_Producto();
  }

  async buscar_Producto() {
    let consultaTerminada$ = new Subject<boolean>();

    try {
      this.MensajeAlertaPantalla =
        Mensajes_Productos_Modificar.Producto_Cargando_ID;
      this.TipoAlertaPantalla = TypeAlert.Alert_Loading;
      this.MostrarAlertaPantalla = true;
      this.OcultarPantalla = true;

      const productosObservable = this._productoUseCase.getProductoID(
        this.id_Producto_Input
      );

      this.datos_producto = await this._productoUseCase
        .getProductoID(this.id_Producto_Input)
        .toPromise();

      this.datos_inventario = await this._inventarioUseCase
        .getProductoID(+this.datos_producto.id)
        .toPromise();
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
        tipoCantidadObservable,
      ]).subscribe(
        ([
          productos,
          marcas,
          proveedores,
          categorías,
          animales,
          tiposCantidad,
        ]) => {
          // Mapea el campo id_marca de productos al nombre correspondiente
          const marca = marcas.find(
            (marca) => marca.id_marca === this.datos_producto.id_marca
          );
          if (marca) {
            this.datos_producto.id_marca = marca.nombre;
            this.datos_producto.nomenclaturaMarca = marca.nomenclatura;
          }

          // Mapea el campo id_proveedor de productos al nombre correspondiente
          const proveedor = proveedores.find(
            (proveedor) =>
              proveedor.id_proveedor === this.datos_producto.id_proveedor
          );
          if (proveedor) {
            this.datos_producto.id_proveedor = proveedor.nombre;
            this.datos_producto.nomenclaturaProveedor = proveedor.nomenclatura;
          }
          // Mapea el campo id_categoria de productos al nombre correspondiente
          const categoria = categorías.find(
            (categoria) =>
              categoria.id_categoria === this.datos_producto.id_categoria
          );
          if (categoria) {
            this.datos_producto.id_categoria = categoria.nombre;
            this.datos_producto.nomenclaturaCategoria = categoria.nomenclatura;
          }

          // Mapea el campo id_animal de productos al nombre correspondiente
          const animal = animales.find(
            (animal) => animal.id_categoria === this.datos_producto.id_animal
          );
          if (animal) {
            this.datos_producto.id_animal = animal.nombre;
            this.datos_producto.nomenclaturaAnimal = animal.nomenclatura;
          }

          // Mapea el campo id_tipoCantidad de productos al nombre correspondiente
          const tipoCantidad = tiposCantidad.find(
            (tipoCantidad) =>
              tipoCantidad.id_tipoCantidad ===
              this.datos_producto.id_tipoCantidad
          );
          if (tipoCantidad) {
            this.datos_producto.id_tipoCantidad = tipoCantidad.nombre;
            this.datos_producto.nomenclaturaTipoCantidad =
              tipoCantidad.nomenclatura;
          }

          // Mapea el campo venta_granel de productos al nombre correspondiente
          if (this.datos_producto.venta_granel) {
            this.datos_producto.venta_granel = 'Si';
          } else {
            this.datos_producto.venta_granel = 'No';
          }

          consultaTerminada$.next(true);
        }
      );
    } catch (error) {
      this.MensajeAlertaPantalla =
        Mensajes_Productos_Modificar.Producto_Cargando_ID_Error;
      this.TipoAlertaPantalla = TypeAlert.Alert_Error;
      this.MostrarAlertaPantalla = true;
      this.OcultarPantalla = false;
      consultaTerminada$.next(false);

      setTimeout(() => {
        this.MostrarAlertaPantalla = false;
      }, 1000);
    } finally {
      consultaTerminada$.subscribe(() => {
        this.MostrarAlertaPantalla = false;
        this.OcultarPantalla = false;
      });
    }
  }

  async EliminarProducto() {
    let consultaTerminada$ = new Subject<boolean>();
    try {
      this.MensajeAlertaPantalla =
        Mensajes_Productos_Modificar.Producto_Eliminar_Cargando;
      this.TipoAlertaPantalla = TypeAlert.Alert_Warning;
      this.MostrarAlertaPantalla = true;
      this.OcultarPantalla = true;

      await this._inventarioUseCase
        .deleteProducto(this.datos_producto.id)
        .toPromise();
      await this._productoUseCase
        .deleteProducto(this.datos_producto.id)
        .toPromise();
      this.cache.eliminar_DatoLocal('producto');
      this.router.navigate(['/inventario']);
      consultaTerminada$.next(true);
    } catch (error) {
      this.MensajeAlertaPantalla =
        Mensajes_Productos_Modificar.Producto_Eliminar_Error;
      this.TipoAlertaPantalla = TypeAlert.Alert_Error;
      this.MostrarAlertaPantalla = true;
      consultaTerminada$.next(true);

      setTimeout(() => {
        this.MostrarAlertaPantalla = false;
        this.OcultarPantalla = false;
      }, 1000);
    } finally {
      consultaTerminada$.subscribe(() => {
        this.MostrarAlertaPantalla = false;
      });
    }
  }

  MostrarFormulario() {
    this.mostrar_formulario = true;
  }

  OcultarFormulario() {
    this.mostrar_formulario = false;
  }

  CrearProducto() {
    this.Producto.nombre = this.nombre_producto || this.datos_producto.nombre;
    this.Producto.precio = this.precio_producto || this.datos_producto.precio;
    this.Producto.cantidad =
      this.cantidad_producto || this.datos_producto.cantidad;
    this.Producto.descripcion =
      this.descripcion_producto || this.datos_producto.descripcion;
    this.Producto.url_imagen = this.url_imagen || this.datos_producto.imagen;
    this.Producto.nomenclaturaMarca =
      this.marca_producto || this.datos_producto.nomenclaturaMarca;
    this.Producto.nomenclaturaCategoria =
      this.categoria_producto || this.datos_producto.nomenclaturaCategoria;
    this.Producto.nomenclaturaProveedor =
      this.proveedor_producto || this.datos_producto.nomenclaturaProveedor;
    this.Producto.nomenclaturaAnimal =
      this.animal_producto || this.datos_producto.nomenclaturaAnimal;
    this.Producto.nomenclaturaTipoCantidad =
      this.tipo_cantidad_producto ||
      this.datos_producto.nomenclaturaTipoCantidad;
    this.Producto.precio_granel = this.precio_granel_producto || null;
    this.Producto.venta_granel = this.venta_granel_producto;
    this.Producto.codigo_barras = this.id_Producto_Input;
  }

  CrearProductoInventario(id_producto: string) {
    this.Inventario.id_producto = id_producto;
    this.Inventario.existencias =
      this.existencias_producto || this.datos_inventario.existencias;
    this.Inventario.stock_minimo =
      this.stock_minimo_producto || this.datos_inventario.StockMinimo;
    this.Inventario.stock_maximo =
      this.stock_maximo_producto || this.datos_inventario.StockMaximo;
  }

  async ModificarProducto() {
    let errorOcurrido = false;

    try {
      this.MensajeAlertaPantalla =
        Mensajes_Productos_Modificar.Producto_Modificar_Cargando;
      this.TipoAlertaPantalla = TypeAlert.Alert_Loading;
      this.MostrarAlertaPantalla = true;
      this.OcultarPantalla = true;

      await this.SubirImagenFirestore();
      this.CrearProducto();
      const response: any = await this._productoUseCase
        .putProducto(
          this.Producto.nombre,
          this.Producto.precio,
          this.Producto.cantidad,
          this.Producto.descripcion,
          this.Producto.url_imagen,
          this.Producto.nomenclaturaMarca,
          this.Producto.nomenclaturaCategoria,
          this.Producto.nomenclaturaProveedor,
          this.Producto.nomenclaturaAnimal,
          this.Producto.nomenclaturaTipoCantidad,
          this.Producto.codigo_barras,
          this.Producto.precio_granel,
          this.Producto.venta_granel,
          this.datos_producto.id
        )
        .toPromise();
      this.id_producto_inventario = response.id;

      await this.CrearProductoInventario(this.id_producto_inventario);
      await this._inventarioUseCase
        .putProducto(
          this.Inventario.existencias,
          this.Inventario.stock_minimo,
          this.Inventario.stock_maximo,
          this.id_producto_inventario
        )
        .toPromise();
    } catch (error) {
      errorOcurrido = true;
      this.MensajeAlertaPantalla =
        Mensajes_Productos_Modificar.Producto_Modificar_Error;
      this.TipoAlertaPantalla = TypeAlert.Alert_Error;
      this.MostrarAlertaPantalla = true;
      this.OcultarPantalla = true;

      setTimeout(() => {
        this.MostrarAlertaPantalla = false;
        this.OcultarPantalla = false;
      }, 1000);
    } finally {
      // Después de que el bloque try...catch...finally ha terminado,
      // verifica si se ha producido un error antes de mostrar el mensaje de éxito.
      if (!errorOcurrido) {
        this.MensajeAlertaPantalla =
          Mensajes_Productos_Modificar.Producto_Modificar_Success;
        this.TipoAlertaPantalla = TypeAlert.Alert_Success;
        this.MostrarAlertaPantalla = true;
        this.OcultarPantalla = true;

        setTimeout(() => {
          this.MostrarAlertaPantalla = false;
          this.OcultarPantalla = false;
          this.router.navigate(['/inventario']);
        }, 1000);
      }
    }
  }

  async SubirImagenFirestore() {
    if (this.archivo_imagen) {
      const filePath = `images/${this.archivo_imagen.name}`;
      const fileRef = this.storage.ref(filePath);
      try {
        await this.storage.upload(filePath, this.archivo_imagen);
        const downloadUrl: any = await fileRef.getDownloadURL().toPromise();
        this.url_imagen = downloadUrl;
      } catch (error: any) {
        this.MensajeAlertaPantalla = error;
        this.TipoAlertaPantalla = TypeAlert.Alert_Error;
        this.MostrarAlertaPantalla = true;
        this.OcultarPantalla = false;
        setTimeout(() => {
          this.MostrarAlertaPantalla = false;
        }, 1000);
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
    await this._info.getMarcas().subscribe((response: any) => {
      this.arreglo_marcas = response;
    });

    this._info.getProveedores().subscribe((response: any) => {
      this.arreglo_proveedores = response;
    });

    this._info.getCategorias().subscribe((response: any) => {
      this.arrelo_categorias = response;
    });

    this._info.getAnimales().subscribe((response: any) => {
      this.arreglo_animales = response;
    });

    this._info.getTipoCantidad().subscribe((response: any) => {
      this.arreglo_tipos_cantidad = response;
    });
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
  }

  actualizarAnimal(event: Event): void {
    this.animal_producto = (event.target as HTMLInputElement).value;
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

  habilitarBoton() {
    this.botonHabilitado = this.consentimiento;
  }
}
