import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyboardShortcutsService {

  constructor() {
    document.addEventListener('keydown', this.manejarEventosDeTeclado, { capture: true });
  }

  manejarAtajo_BuscarProducto() {
    const inputBusqueda = document.getElementById('input_buscar-Producto');
    if (inputBusqueda) {
      inputBusqueda.focus();
    }
  }

  manejarAtajo_LimpiarBusqueda() {
    const botonLimpiarBusqueda = document.getElementById('boton_limpiar_busqueda');
    if (botonLimpiarBusqueda) {
      botonLimpiarBusqueda.click();
    }
  }

  manejarAtajo_EliminarProductos() {
    const botonEliminar = document.getElementById('boton_borrar_producto');
    if (botonEliminar) {
      botonEliminar.click();
    }
  }

  manejarAtajo_RealizarVenta() {
    const botonRealizarVenta = document.getElementById('botonRealizarVenta');
    if (botonRealizarVenta) {
      botonRealizarVenta.click();
    }
  }

  manejarAtajo_RealizarTicket() {
    const botonRealizarTicket = document.getElementById('botonGenerarTicket');
    if (botonRealizarTicket) {
      botonRealizarTicket.click();
    }
  }

  registrarAtajosDeTeclado() {
    document.addEventListener('keydown', this.manejarEventosDeTeclado);
  }

  removerAtajosDeTeclado() {
    document.removeEventListener('keydown', this.manejarEventosDeTeclado);
  }

  manejarEventosDeTeclado = (event: KeyboardEvent) => {
    const altKeyPressed = event.altKey;

    if (altKeyPressed) {
      if (event.key === 'b') {
        this.manejarAtajo_BuscarProducto();
      } else if (event.key === 'e') {
        this.manejarAtajo_EliminarProductos();
      } else if (event.key === 'a') {
        this.manejarAtajo_LimpiarBusqueda();
      } else if (event.key === 'v') {
        this.manejarAtajo_RealizarVenta();
      } else if (event.key === 't') {
        this.manejarAtajo_RealizarTicket();
      }
    }
  }
}
