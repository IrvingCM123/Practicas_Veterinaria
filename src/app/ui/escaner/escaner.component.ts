import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Tickets_Service } from '../services/imprimirTicker.service';

import { HttpClient } from '@angular/common/http';
import { EscanerUseCase } from '../../domain/escaner-domain/client/escaner-usecase';
import { Datos_Locales } from '../services/DatosLocales.service';
import { Venta_Service } from '../services/Lista_Ticket.service';

export interface Agregar_Producto {
  ID: string;
  Nombre: string;
  Precio: number;
  Cantidad: number;
  Subtotal: number;
  Marca: string;
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

  public productosVenta: Agregar_Producto[] | any = [];

  constructor(
    private http: HttpClient,
    private _escanerUseCase: EscanerUseCase,
    private ticketService: Tickets_Service,
    private cache: Datos_Locales,
    private venta_Service: Venta_Service,
    private cdr: ChangeDetectorRef
  ) {}

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
        console.log(obtener_busqueda);
        const productoAgregado: Agregar_Producto = {
          ID: this.producto_Encontrado.id,
          Nombre: this.producto_Encontrado.nombre,
          Precio: parseFloat(this.producto_Encontrado.precio),
          Cantidad: 1,
          Subtotal: parseFloat(this.producto_Encontrado.precio) * 1,
          Marca: this.producto_Encontrado.marca,
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

      if (busquedaProducto_obtenido && busquedaProducto_obtenido.length > 0) {
        return busquedaProducto_obtenido[0];
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error al buscar producto:', error);
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

  actualizarSubtotal(producto: Agregar_Producto) {
    producto.Subtotal = producto.Precio * producto.Cantidad;
  }

  generar_Ticket() {
    const total = this.calcularTotal();
    const cambio = this.montoAPagar - total;

    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString();
    const horaFormateada = fechaActual.toLocaleTimeString();

    const ticket = {
      logoUrl: '../../../assets/Imagenes/logo.png',
      tienda: 'Como perros y gatos',
      fecha: `${fechaFormateada} ${horaFormateada}`,
      productos: this.productosVenta.map((producto: Agregar_Producto) => {
        return {
          cantidad: producto.Cantidad,
          nombre: producto.Nombre,
          precio: `$${producto.Precio.toFixed(2)}`,
          subtotal: producto.Subtotal.toFixed(2),
          marca: producto.Marca,
        };
      }),
      total: `$${total.toFixed(2)}`,
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

    this.venta_Service.reiniciarProductosEncontrados();
  }

  public montoAPagar: number = 0;
  public cambio: number = 0;

  calcularCambio() {
    this.cambio = this.montoAPagar - this.calcularTotal();
  }

  calcularTotal(): number {
    return this.productosVenta.reduce(
      (total: any, producto: any) => total + producto.Subtotal,
      0
    );
  }

}
