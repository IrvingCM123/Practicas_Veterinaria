import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
  AfterViewInit,
  ViewChild,
  HostListener,
  ViewChildren,
  QueryList,
} from '@angular/core';

import { Tickets_Service } from '../services/imprimirTicker.service';

import { EscanerUseCase } from '../../domain/escaner-domain/client/escaner-usecase';
import { VentaUseCase } from 'src/app/domain/venta-domain/client/venta-usecase';

import { Venta_Service } from '../services/Lista_Ticket.service';
import { KeyboardShortcutsService } from './atajo_teclado.service';

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
export class EscanerComponent implements OnInit, AfterViewInit {

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

  //Variables para el ticket
  public montoAPagar: number = 0;
  public cambio: number = 0;

  //Ubicar el input de busqueda a través de ViewChild
  @ViewChild('BuscarProducto') inputBusqueda: ElementRef | any;

  //Ubicar el input de cantidad a través de ViewChild
  @ViewChildren('inputDinamicoCantidad') inputDinamicoCantidad:
    | QueryList<ElementRef>
    | any;

  //Contador de objetos o productos en lista para el input de cantidad
  private contadorInputDinamicoCantidad: number = 0;

  //Ubicar el input de granel a través de ViewChild
  @ViewChildren('inputDinamicoGranel') inputDinamicoGranel:
    | QueryList<ElementRef>
    | any;

  //Contador de objetos o productos en lista para el input de granel
  private contadorInputDinamicoGranel: number = 0;

  //Variable para mostrar los mensajes de alerta o de carga
  MostrarAlertaPantalla: boolean = false;
  MensajeAlertaPantalla: string = '';

  constructor(
    private _escanerUseCase: EscanerUseCase,
    private ticketService: Tickets_Service,
    private venta_Service: Venta_Service,
    private cdr: ChangeDetectorRef,
    private _ventaUseCase: VentaUseCase,
    private _keyboardShortcutsService: KeyboardShortcutsService
  ) {
    this._keyboardShortcutsService.registrarAtajosDeTeclado();
  }

  async ngOnInit() {
    this.venta_Service.reiniciarProductosEncontrados();
    this.agregar_VentaProducto();
    this.registrarAtajosDeTeclado();
  }

  ngAfterViewInit() {
    this.inputBusqueda.nativeElement.focus();
  }

  limpiar_Input() {
    this.id_Producto_Input = '';
  }

  async buscar_Producto() {
    if (this.id_Producto_Input.trim() === '') {
      this.MensajeAlertaPantalla = 'Por favor, ingresa un término de búsqueda.';
      this.MostrarAlertaPantalla = true;
    } else {
      let obtener_busqueda: Producto | boolean = await this.buscar_Producto_BD(
        this.id_Producto_Input
      );

      if (obtener_busqueda === false) {

        this.MensajeAlertaPantalla = 'Producto no encontrado.';
        this.MostrarAlertaPantalla = true;

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
        };

        await this.venta_Service.agregarProductoEncontrado(productoAgregado);
        this.limpiar_Input();
      }
    }

    this.MostrarAlertaPantalla = true;
    setTimeout(() => {
      this.MostrarAlertaPantalla = false;
    }, 2000);
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

  eliminar_UltimoProducto() {
    this.venta_Service.eliminarUltimoProductoEncontrado();
  }

  actualizarIva(producto: Agregar_Producto) {
    producto.Iva = (producto.Precio * 0.16 * producto.Cantidad).toFixed(2);
  }

  actualizarSubtotal(producto: Agregar_Producto) {
    this.actualizarIva(producto);

    producto.Subtotal = producto.VentaGranel
      ? producto.Precio_granel * producto.Cantidad
      : producto.Precio * producto.Cantidad;
  }

  generar_Ticket() {
    if (!this.calcularCambio()) {
      return;
    } else {
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
          const precioProducto = +(this.venta_granel_boleean &&
            producto.VentaGranel
            ? producto.Precio_granel
            : producto.Precio);
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
      this.limpiarPantalla();
    }
  }

  calcularCambio() {
    if (this.montoAPagar === 0) {
      this.mensaje_Aviso = 'Por favor, ingresa el monto a pagar';
      this.mostrar_Mensaje_Aviso = true;
      setTimeout(() => {
        this.mostrar_Mensaje_Aviso = false;
      }, 1000);
      return false;
    } else if (this.montoAPagar < this.calcularTotalVenta()) {
      this.mensaje_Aviso = 'El monto a pagar es menor al total de la venta';
      this.mostrar_Mensaje_Aviso = true;
      setTimeout(() => {
        this.mostrar_Mensaje_Aviso = false;
      }, 1000);
      return false;
    } else {
      this.cambio = this.montoAPagar - this.calcularTotalVenta();
      return true;
    }
  }

  async guardarVenta() {
    if (!this.calcularCambio()) {
      return;
    } else {
      try {
        const fechaActual = new Date();
        const año = fechaActual.getFullYear();
        const mes = fechaActual.getMonth() + 1;
        const dia = fechaActual.getDate();

        const fechaVenta = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''
          }${dia}`;

        const iva = this.calcularIvaVenta(); // Calcula el IVA acumulado de todos los productos
        const subtotal = this.calcularSubtotal(); // Calcula el subtotal sin IVA

        const total = subtotal + iva;

        const ventaGuardada = {
          id_vendedor: 'IRCM',
          id_sucursal: 1,
          fecha_venta: fechaVenta,
          total_venta: `${total.toFixed(2)}`,
          subtotal: `${subtotal.toFixed(2)}`,
          iva: iva.toFixed(2),

          detallesVenta: this.productosVenta.map(
            (producto: Agregar_Producto) => {
              const precioProducto =
                this.venta_granel_boleean && producto.VentaGranel
                  ? producto.Precio_granel
                  : producto.Precio;
              const subtotalProducto = producto.Cantidad * precioProducto;
              const ivaProducto =
                this.venta_granel_boleean && producto.VentaGranel
                  ? subtotalProducto * 0.16
                  : subtotalProducto * 0.16;
              const ventaPorcion =
                producto.VentaGranel && this.venta_granel_boleean
                  ? true
                  : false;

              return {
                id_producto: producto.ID,
                cantidad_vendida: producto.Cantidad,
                precio_producto: precioProducto,
                subtotal: subtotalProducto + ivaProducto,
                venta_porcion: ventaPorcion,
                iva: ivaProducto.toFixed(2),
              };
            }
          ),
        };

        let id_vendedor = ventaGuardada.id_vendedor;
        let id_sucursal = ventaGuardada.id_sucursal;
        let fecha_venta = ventaGuardada.fecha_venta;
        let total_venta = ventaGuardada.total_venta;
        let subtotal1 = ventaGuardada.subtotal;
        let iva1 = ventaGuardada.iva;
        let detallesVenta = ventaGuardada.detallesVenta;

        await this._ventaUseCase
          .postVentaProducto(
            id_vendedor,
            id_sucursal,
            fecha_venta,
            total_venta,
            subtotal1,
            iva1,
            detallesVenta
          )
          .toPromise();

        this.mensaje_Aviso = 'Venta registrada';

        return true;
        this.limpiarPantalla();
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
  }

  calcularSubtotal(): number {
    return this.productosVenta.reduce(
      (total: number, producto: Agregar_Producto) => {
        const precioProducto =
          producto.VentaGranel && this.venta_granel_boleean
            ? producto.Precio_granel
            : producto.Precio;
        return total + producto.Cantidad * precioProducto;
      },
      0
    );
  }

  calcularTotalVenta(): number {
    return this.productosVenta.reduce(
      (total: number, producto: Agregar_Producto) => {
        const precioProducto =
          producto.VentaGranel && this.venta_granel_boleean
            ? producto.Precio_granel
            : producto.Precio;
        const subtotalProducto = producto.Cantidad * precioProducto;
        const ivaProducto = producto.VentaGranel
          ? subtotalProducto * 0.16
          : subtotalProducto * 0.16;

        return +(total + subtotalProducto + ivaProducto).toFixed(2);
      },
      0
    );
  }

  calcularIvaVenta(): number {
    return this.productosVenta.reduce(
      (total: number, producto: Agregar_Producto) => {
        const precioProducto =
          producto.VentaGranel && this.venta_granel_boleean
            ? producto.Precio_granel
            : producto.Precio;
        const subtotalProducto = producto.Cantidad * precioProducto;
        total += +(subtotalProducto * 0.16).toFixed(2);
        console.log(subtotalProducto);
        console.log(total);
        if (!this.venta_granel_boleean) {
          const ivaProducto = subtotalProducto * 0.16;
          total += +ivaProducto.toFixed(2);
        }

        return +total.toFixed(2);
      },
      0
    );
  }

  calcularIVA(): number {
    return this.productosVenta.reduce(
      (total: number, producto: Agregar_Producto) => {
        // Suma el IVA de cada producto al total
        return total + producto.Precio * 0.16 * producto.Cantidad;
      },
      0
    );
  }

  limpiarPantalla() {
    this.productosVenta = [];
    this.montoAPagar = 0;
    this.cambio = 0;
    this.limpiar_Input();
    window.location.reload();
  }

  actualizarVentaGranel(event: Event): void {
    this.venta_granel_boleean = (event.target as HTMLInputElement).checked;

    this.actualizarTotales();
  }

  actualizarTotales() {
    this.productosVenta.forEach((producto: Agregar_Producto) => {
      if (this.venta_granel_boleean) {
        producto.Subtotal = producto.Precio_granel * producto.Cantidad;
        producto.Iva = '0';
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

  manejarAtajo_ActualizarCantidad() {
    if (this.inputDinamicoCantidad.length > 0) {
      this.inputDinamicoCantidad
        .toArray()
      [this.contadorInputDinamicoCantidad].nativeElement.focus();
      this.contadorInputDinamicoCantidad =
        (this.contadorInputDinamicoCantidad + 1) %
        this.inputDinamicoCantidad.length;
    }
  }

  manejarAtajo_PermitirVentaGranel() {
    if (this.inputDinamicoGranel.length > 0) {
      this.inputDinamicoGranel
        .toArray()
      [this.contadorInputDinamicoGranel].nativeElement.click();
      this.contadorInputDinamicoGranel =
        (this.contadorInputDinamicoGranel + 1) %
        this.inputDinamicoGranel.length;
    }
  }

  registrarAtajosDeTeclado() {
    document.addEventListener('keydown', this.manejarEventosDeTeclado);
  }

  manejarEventosDeTeclado = (event: KeyboardEvent) => {
    if (event.key === 'm') {
      this.manejarAtajo_ActualizarCantidad();
    } else if (event.key === 'b') {
      this.manejarAtajo_PermitirVentaGranel();
    }
  };

  ngOnDestroy() {
    this._keyboardShortcutsService.removerAtajosDeTeclado();
  }
}
