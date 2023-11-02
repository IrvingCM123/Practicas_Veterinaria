import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyboardShortcutsService {

  private isYKeyPressed = false;

  constructor() {
    document.addEventListener('keydown', this.manejarEventosDeTeclado);
    document.addEventListener('keyup', this.resetearIsYKeyPressed);
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

  registrarAtajosDeTeclado() {
    document.addEventListener('keydown', this.manejarEventosDeTeclado);
  }

  // Remover eventos de teclado
  removerAtajosDeTeclado() {
    document.removeEventListener('keydown', this.manejarEventosDeTeclado);
  }

  // Manejar eventos de teclado
  manejarEventosDeTeclado = (event: KeyboardEvent) => {

    if (event.key === 'y' && !this.isYKeyPressed) {
      // La tecla 'y' ha sido presionada
      this.isYKeyPressed = true;
      event.preventDefault();
    } else if (event.key === 'b' && this.isYKeyPressed )  {
      this.manejarAtajo_BuscarProducto();
    } else if (event.key === 'z' && this.isYKeyPressed ) {
      this.manejarAtajo_EliminarProductos();
    } else if (event.key === 'x' && this.isYKeyPressed ) {
      this.manejarAtajo_LimpiarBusqueda();
    }
  }

  resetearIsYKeyPressed = (event: KeyboardEvent) => {
    if (event.key === 'y') {
      this.isYKeyPressed = false;
    }
  };
}
