import { Component, OnInit } from '@angular/core';
import { InventarioUseCase } from 'src/app/domain/inventario-domain/client/inventario-usecase';
import { Datos_Locales } from '../services/DatosLocales.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  constructor(
    private _inventarioUseCase: InventarioUseCase,
    private cache: Datos_Locales,
  ) { }

  public producto_prueba: any = {
    id_producto: 11312313,
    id_animal: 1,
    nombre: "Comida para perros 1",
    descripcion: "Comida balanceada para perros adultos",
    precio: "20.99",
    id_marca: 1,
    id_proveedor: 101,
    id_categoria: 201,
    imagen: "perro_comida_1.jpg",
    cantidad: "1000g",
    stock_maximo: 30,
    stock_minimo: 10,
    stock_actual: 20,
  }


  private id_Producto_Input: string = '';
  public datos_producto: any = [];
  public nuevos_datos_producto: any = [];

  public mostrar_Mensaje_Aviso = false;
  public mensaje_Aviso: string = '';

  public mostrar_formulario = true;

  public Marca: string = "Marca"
  marcasUnicas= []

  ngOnInit(): void {
    this.id_Producto_Input = this.cache.obtener_DatoLocal('ProductoID');
    this.buscar_Producto();
  }

  async buscar_Producto() {
    this.datos_producto = await this._inventarioUseCase.getProductoID(this.id_Producto_Input);
    console.log(this.datos_producto);
  }

  async ModificarProducto() {
    await this._inventarioUseCase.putProducto(this.nuevos_datos_producto);
  }

  async EliminarProducto() {
    await this._inventarioUseCase.deleteProducto(this.id_Producto_Input);
  }

  MostrarFormulario() {
    this.mostrar_formulario = true;
  }

  OcultarFormulario() {
    this.mostrar_formulario = false;
  }


}
