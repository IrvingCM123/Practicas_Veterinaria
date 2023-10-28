import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Tickets_Service } from '../services/imprimirTicker.service';

import { HttpClient } from '@angular/common/http';
import { EscanerUseCase } from '../../domain/escaner-domain/client/escaner-usecase';
import { VentaUseCase } from 'src/app/domain/venta-domain/client/venta-usecase';
import { Datos_Locales } from '../services/DatosLocales.service';
import { Venta_Service } from '../services/Lista_Ticket.service';

export interface Agregar_Producto {
  ID: string;
  Nombre: string;
  Precio: number;
  Cantidad: number;
  Subtotal: number;
  Marca: string;
  Iva: string;
  VentaGranel?: boolean;
  Precio_granel?: number | string | any;
  //Codigo_Barras?: string;
}

export interface Producto {
  ID: string;
  Nombre: string;
  Precio: string;
  Descripcion: string;
  Imagen: string;
  Marca: string;
  Categoria: string;
  iva: string;
}

export interface ProductoVenta {
  Nombre: string;
  Precio: number;
  Cantidad: number;
  Subtotal: number;
}

@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.component.html',
  styleUrls: ['./escaner.component.scss'],
})
export class EscanerComponent implements OnInit {
  // Variables para el escaner
  public id_Producto_Input: string = '';

  // Variables para guardar el producto buscado
  public producto_Encontrado: Producto | any = [];

  // Variables para mostrar mensajes
  public Mostrar_Producto = false;
  public mensaje_Aviso: string = '';
  public mostrar_Mensaje_Aviso = false;

  // Variables para mostrar los productos en la lista de venta
  public productosVenta: Agregar_Producto[] | any = [];

  // Variable para decidir si es una venta a granel o no
  public venta_granel_boleean: any = false;

  constructor(
    private http: HttpClient,
    private _escanerUseCase: EscanerUseCase,
    private ticketService: Tickets_Service,
    private cache: Datos_Locales,
    private venta_Service: Venta_Service,
    private cdr: ChangeDetectorRef,
    private _ventaUseCase: VentaUseCase
  ) { }

  async ngOnInit() {
    this.venta_Service.reiniciarProductosEncontrados();
    this.agregar_VentaProducto();
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

        const productoAgregado: Agregar_Producto = {
          ID: this.producto_Encontrado.id,
          Nombre: this.producto_Encontrado.nombre,
          Precio: parseFloat(this.producto_Encontrado.precio),
          Cantidad: 1,
          Subtotal:
            parseFloat(this.producto_Encontrado.precio) +
            +this.producto_Encontrado.precio * 0.16,
          Marca: this.producto_Encontrado.marca,
          Iva: (this.producto_Encontrado.precio * 0.16).toString(),
          VentaGranel: this.producto_Encontrado.venta_granel,
          Precio_granel: this.producto_Encontrado.precio_granel,
          //Codigo_Barras: this.producto_Encontrado.codigo_barras,
        };

        await this.venta_Service.agregarProductoEncontrado(productoAgregado);
      }
    }

    this.mostrar_Mensaje_Aviso = true;
    setTimeout(() => {
      this.mostrar_Mensaje_Aviso = false;
    }, 1000);
  }

  async buscar_Producto_BD(producto_deseado: string) {
    try {
      const busquedaProducto_obtenido: any = await this._escanerUseCase
        .getProductoEscaneado(producto_deseado)
        .toPromise();

      if (busquedaProducto_obtenido) {
        return busquedaProducto_obtenido;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async agregar_VentaProducto() {
    this.productosVenta = await this.Obtener_Lista_Productos();
    this.producto_Encontrado = null;
    this.id_Producto_Input = '';
    this.cdr.markForCheck();
  }

  async Obtener_Lista_Productos() {
    return await this.venta_Service.obtenerProductosEncontrados();
  }

  eliminar_VentaProducto(producto: Agregar_Producto): void {
    const index = this.productosVenta.indexOf(producto);
    if (index !== -1) {
      this.productosVenta.splice(index, 1);

      this.venta_Service.actualizarProductosEncontrados(this.productosVenta);
    }
  }

  actualizarIva(producto: Agregar_Producto) {
    producto.Iva = (producto.Precio * 0.16 * producto.Cantidad).toFixed(2);
  }

  actualizarSubtotal(producto: Agregar_Producto) {

    this.actualizarIva(producto);

    producto.Subtotal = producto.VentaGranel ? producto.Precio_granel * producto.Cantidad : producto.Precio * producto.Cantidad;
  }


  generar_Ticket() {

    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString();
    const horaFormateada = fechaActual.toLocaleTimeString();


    let iva = this.calcularIvaVenta();
    let subtotal = this.calcularSubtotal();
    let totalVenta = this.calcularTotalVenta();
    const cambio = +(this.montoAPagar - totalVenta).toFixed(2);

    const ticket = {
      logoUrl: '../../../assets/Imagenes/logo.png',
      tienda: 'Como perros y gatos',
      fecha: `${fechaFormateada} ${horaFormateada}`,
      productos: this.productosVenta.map((producto: Agregar_Producto) => {

        const precioProducto = +(this.venta_granel_boleean && producto.VentaGranel ? producto.Precio_granel : producto.Precio);
        console.log(precioProducto);
        return {
          cantidad: producto.Cantidad,
          nombre: producto.Nombre,
          precio: `$${precioProducto.toFixed(2)}`,
          subtotal: precioProducto * producto.Cantidad,
          marca: producto.Marca,
          iva: iva,
        };
      }),

      total: `$${totalVenta.toFixed(2)}`,
      montoPagado: this.montoAPagar,
      cambio: cambio,
      veterinaria_1: 'M.V.Z. Nilda Carreón F.',
      veterinaria_2: 'M.V.Z. Marisa R. Carreón',
      direccion:
        'Junto al garaje del Hotel Trueba. Sur. 11 No. 337 Orizaba, Ver.',
      tel: '272-724-2852',
      cel_1: '272-114-6086',
      cel_2: '272-154-7909',
      lema: '¡Consentimos a tu mascota!',
    };

    this.ticketService.imprimir(ticket);
    this.guardarVenta();
    this.venta_Service.reiniciarProductosEncontrados();
    //this.limpiarPantalla();
  }

  public montoAPagar: number = 0;
  public cambio: number = 0;

  calcularCambio() {
    this.cambio = +(this.montoAPagar - this.calcularTotalVenta()).toFixed(2);
  }

  calcularTotal(): number {
    return this.productosVenta.reduce(
      (total: any, producto: any) => total + producto.Subtotal,
      0
    );
  }

  async guardarVenta() {
    try {
      const fechaActual = new Date();
      const año = fechaActual.getFullYear();
      const mes = fechaActual.getMonth() + 1;
      const dia = fechaActual.getDate();

      const fechaVenta = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;

      const iva = this.calcularIvaVenta(); // Calcula el IVA acumulado de todos los productos
      const subtotal = this.calcularSubtotal(); // Calcula el subtotal sin IVA

      const total = subtotal + iva;

      const ventaGuardada = {
        id_vendedor: "ircm",
        id_sucursal: 1,
        fecha_venta: fechaVenta,
        total_venta: `${total.toFixed(2)}`,
        subtotal: `${subtotal.toFixed(2)}`,
        iva: iva.toFixed(2),

        detallesVenta: this.productosVenta.map((producto: Agregar_Producto) => {
          const precioProducto = this.venta_granel_boleean ? producto.Precio_granel : producto.Precio;
          const subtotalProducto = producto.Cantidad * precioProducto;
          const ivaProducto = this.venta_granel_boleean ? subtotalProducto * 0.16 : subtotalProducto * 0.16;

          return {
            id_producto: producto.ID,
            cantidad_vendida: producto.Cantidad,
            precio_producto: precioProducto,
            subtotal: subtotalProducto + ivaProducto,
            venta_porcion: this.venta_granel_boleean,
            iva: ivaProducto.toFixed(2),
          };
        }),
      };
      console.log(ventaGuardada);
      //await this._ventaUseCase.postVentaProducto(ventaGuardada).toPromise();

      this.mensaje_Aviso = 'Venta registrada';

      return true;
    } catch (error) {
      this.mensaje_Aviso = 'Error al registrar la venta';
      return false;
    } finally {
      this.mostrar_Mensaje_Aviso = true;
      setTimeout(() => {
        this.mostrar_Mensaje_Aviso = false;
      }, 1000);
    }
  }

  calcularSubtotal(): number {
    return this.productosVenta.reduce((total: number, producto: Agregar_Producto) => {
      const precioProducto = producto.VentaGranel && this.venta_granel_boleean ? producto.Precio_granel : producto.Precio;
      return total + producto.Cantidad * precioProducto;
    }, 0);
  }

  calcularTotalVenta(): number {
    return this.productosVenta.reduce((total: number, producto: Agregar_Producto) => {
      const precioProducto = producto.VentaGranel && this.venta_granel_boleean ? producto.Precio_granel : producto.Precio;
      const subtotalProducto = producto.Cantidad * precioProducto;
      const ivaProducto = producto.VentaGranel ? subtotalProducto * 0.16 : subtotalProducto * 0.16;

      return +(total + subtotalProducto + ivaProducto).toFixed(2);
    }, 0);
  }

  calcularIvaVenta(): number {
    return this.productosVenta.reduce((total: number, producto: Agregar_Producto) => {
      const precioProducto = producto.VentaGranel && this.venta_granel_boleean ? producto.Precio_granel : producto.Precio;
      const subtotalProducto = producto.Cantidad * precioProducto;
      total += +(subtotalProducto * 0.16).toFixed(2);
      console.log(subtotalProducto)
      console.log(total)
      if (!this.venta_granel_boleean) {
        const ivaProducto = subtotalProducto * 0.16;
        total += +(ivaProducto).toFixed(2);
      }

      return total;
    }, 0);
  }


  calcularIVA(): number {
    return this.productosVenta.reduce((total: number, producto: Agregar_Producto) => {
      // Suma el IVA de cada producto al total
      return total + (producto.Precio * 0.16 * producto.Cantidad);
    }, 0);
  }


  limpiarPantalla() {
    this.productosVenta = [];
    this.montoAPagar = 0;
    this.cambio = 0;
    this.limpiar_Input();
    window.location.reload();
  }

  /*actualizarVentaGranel(event: Event): void {
    this.venta_granel_boleean = (event.target as HTMLInputElement).value;
    if (this.venta_granel_boleean == "false") {
      this.venta_granel_boleean = false;
    } else {
      this.venta_granel_boleean = true;
    }
  }*/

  actualizarVentaGranel(event: Event): void {
    this.venta_granel_boleean = (event.target as HTMLInputElement).checked;

    // También puedes llamar a las funciones de actualización aquí si es necesario
    this.actualizarTotales();
  }

  actualizarTotales() {
    this.productosVenta.forEach((producto: Agregar_Producto) => {
      if (this.venta_granel_boleean) {
        producto.Subtotal = producto.Precio_granel * producto.Cantidad;
        producto.Iva = '0'; // No hay IVA en ventas a granel
      } else {
        producto.Subtotal = producto.Precio * producto.Cantidad;
        producto.Iva = (producto.Subtotal * 0.16).toFixed(2);
      }
    });
  }


  subtotalVentaGranel(producto: any) {
    console.log(producto);
    producto.Subtotal = producto.precio_granel * producto.Cantidad;
  }
}
