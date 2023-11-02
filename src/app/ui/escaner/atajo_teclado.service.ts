import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyboardShortcutsService {
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

  manejarAtajo_ActualizarCantidad() {
    const botonActualizarCantidad = document.getElementById('input_cantidad-producto');
    if (botonActualizarCantidad) {
      botonActualizarCantidad.focus();
    }
  }

  manejarAtajo_PermitirVentaGranel() {
    const botonActualizarGranel = document.getElementById('input_granel-producto');
    if (botonActualizarGranel) {
      botonActualizarGranel.click();
    }
  }

  registrarAtajosDeTeclado() {
    document.addEventListener('keydown', this.manejarEventosDeTeclado);
  }

  // Remover eventos de teclado
  removerAtajosDeTeclado() {
    document.removeEventListener('keydown', this.manejarEventosDeTeclado);
  }

  // Manejar eventos de teclado
  manejarEventosDeTeclado = (event: KeyboardEvent) => {
    
    if (event.key === 'b') {
      this.manejarAtajo_BuscarProducto();
    } else if (event.key === 'z') {
      this.manejarAtajo_EliminarProductos();
    } else if (event.key === 'm') {
      this.manejarAtajo_ActualizarCantidad();
    } else if (event.key === 'x') {
      this.manejarAtajo_PermitirVentaGranel();
    } else if (event.key === 'y') {
      this.manejarAtajo_LimpiarBusqueda();
    }
  }
}
