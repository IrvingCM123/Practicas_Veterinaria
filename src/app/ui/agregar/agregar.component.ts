import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Location } from '@angular/common';

import { ProductoUseCase } from 'src/app/domain/producto-domain/client/producto-usecase';
import { InventarioUseCase } from 'src/app/domain/inventario-domain/client/inventario-usecase';

interface ProductoInterface {
  nombre: string;
  descripcion: string;
  precio: number;
  marca: string;
  provedor: string;
  categoria: string;
  animal: string;
  url_imagen: string;
  cantidad: number;
  tipo_cantidad: string;
}

interface InventarioInterface {
  id_producto: string;
  existencias: number;
  stock_minimo: number;
  stock_maximo: number;
}

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  public nombre_producto: string | any;
  public descripcion_producto: string | any;
  public precio_producto: number | any;
  public marca_producto: string | any;
  public proveedor_producto: string | any;
  public categoria_producto: string | any;
  public animal_producto: string | any;
  public url_imagen: string | any;
  public cantidad_producto: number | any;
  public tipo_cantidad_producto: string | any;

  private id_producto: string | any;
  public existencias_producto: number | any;
  public stock_minimo_producto: number | any;
  public stock_maximo_producto: number | any;

  public archivo_imagen: File | any = null;

  private Producto: ProductoInterface = {
    nombre: '',
    descripcion: '',
    precio: 0,
    marca: '',
    provedor: '',
    categoria: '',
    animal: '',
    url_imagen: '',
    cantidad: 0,
    tipo_cantidad: ''
  };

  private Inventario: InventarioInterface = {
    id_producto: '',
    existencias: 0,
    stock_minimo: 0,
    stock_maximo: 0
  };

  constructor(
    private storage: AngularFireStorage,
    private productoUseCase: ProductoUseCase,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  public Marca: any;
  public marcasUnicas: any;

  CrearProducto() {
    this.Producto.nombre = this.nombre_producto;
    this.Producto.descripcion = this.descripcion_producto;
    this.Producto.precio = this.precio_producto;
    this.Producto.marca = this.marca_producto;
    this.Producto.provedor = this.proveedor_producto;
    this.Producto.categoria = this.categoria_producto;
    this.Producto.animal = this.animal_producto;
    this.Producto.url_imagen = this.url_imagen;
    this.Producto.cantidad = this.cantidad_producto;
    this.Producto.tipo_cantidad = this.tipo_cantidad_producto;
  }

  CrearProductoInventario() {
    this.Inventario.id_producto = this.id_producto;
    this.Inventario.existencias = this.existencias_producto;
    this.Inventario.stock_minimo = this.stock_minimo_producto;
    this.Inventario.stock_maximo = this.stock_maximo_producto;
  }

  async GuardarProducto() {
    await this.SubirImagenFirestore();

    this.CrearProducto();

    await this.productoUseCase.postProducto(this.Producto).subscribe(
      (response) => {
        this.id_producto = response.id;
      },
      (error) => {
        console.log(error);
      }
    );

    await this.CrearProductoInventario();
  }

  async SubirImagenFirestore() {
    if (this.archivo_imagen) {
      const filePath = `images/${this.archivo_imagen.name}`;
      const fileRef = this.storage.ref(filePath);
      try {
        await this.storage.upload(filePath, this.archivo_imagen);
        const downloadUrl = await fileRef.getDownloadURL().toPromise();
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

  actualizarNombre(event: Event): void {
    this.nombre_producto = (event.target as HTMLInputElement).value;
  }

  actualizarDescripcion(event: Event): void {
    this.descripcion_producto = (event.target as HTMLInputElement).value;
  }

  actualizarPrecio(event: Event): void {
    this.precio_producto = +(event.target as HTMLInputElement).value;
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
    this.cantidad_producto = +(event.target as HTMLInputElement).value;
  }

  actualizarTipoCantidad(event: Event): void {
    this.tipo_cantidad_producto = (event.target as HTMLInputElement).value;
  }

  actualizarExistencias(event: Event): void {
    this.existencias_producto = +(event.target as HTMLInputElement).value;
  }

  actualizarStockMinimo(event: Event): void {
    this.stock_minimo_producto = +(event.target as HTMLInputElement).value;
  }

  actualizarStockMaximo(event: Event): void {
    this.stock_maximo_producto = +(event.target as HTMLInputElement).value;
  }

  actualizarMarcaUnica(event: Event): void {
    this.Marca = (event.target as HTMLInputElement).value;
  }

  

}
