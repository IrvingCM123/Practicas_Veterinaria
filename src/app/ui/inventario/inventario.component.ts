import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Datos_Locales } from '../services/DatosLocales.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit  {

  productos: any = [
    {
      id_animal: 1,
      nombre: "Comida para perros 1",
      descripcion: "Comida balanceada para perros adultos",
      precio: "20.99",
      id_marca: 1,
      id_proveedor: 101,
      id_categoria: 201,
      imagen: "https://th.bing.com/th/id/OIP.eTCbdR_AFzbqHMPXhrJWUQHaEK?pid=ImgDet&rs=1",
      cantidad: "1000g"
    },
    {
      id_animal: 2,
      nombre: "Arena para gatos 1",
      descripcion: "Arena aglomerante para gatos",
      precio: "8.50",
      id_marca: 2,
      id_proveedor: 102,
      id_categoria: 202,
      imagen: "https://th.bing.com/th/id/OIP.eTCbdR_AFzbqHMPXhrJWUQHaEK?pid=ImgDet&rs=1",
      cantidad: "5kg"
    },
    {
      id_animal: 1,
      nombre: "Juguete para perros 1",
      descripcion: "Pelota de goma para perros",
      precio: "5.99",
      id_marca: 3,
      id_proveedor: 103,
      id_categoria: 201,
      imagen: "https://th.bing.com/th/id/OIP.eTCbdR_AFzbqHMPXhrJWUQHaEK?pid=ImgDet&rs=1",
      cantidad: "1 unidad"
    },
    {
      id_animal: 2,
      nombre: "Comida para gatos 2",
      descripcion: "Comida premium para gatos adultos",
      precio: "15.99",
      id_marca: 4,
      id_proveedor: 104,
      id_categoria: 202,
      imagen: "https://th.bing.com/th/id/OIP.eTCbdR_AFzbqHMPXhrJWUQHaEK?pid=ImgDet&rs=1",
      cantidad: "800g"
    },
    {
      id_animal: 1,
      nombre: "Collar para perros 1",
      descripcion: "Collar ajustable para perros de todas las razas",
      precio: "9.99",
      id_marca: 5,
      id_proveedor: 105,
      id_categoria: 201,
      imagen: "https://th.bing.com/th/id/OIP.eTCbdR_AFzbqHMPXhrJWUQHaEK?pid=ImgDet&rs=1",
      cantidad: "1 unidad"
    },
    {
      id_animal: 2,
      nombre: "Arena para gatos 2",
      descripcion: "Arena de sílice para gatos",
      precio: "7.99",
      id_marca: 2,
      id_proveedor: 102,
      id_categoria: 202,
      imagen: "https://th.bing.com/th/id/OIP.eTCbdR_AFzbqHMPXhrJWUQHaEK?pid=ImgDet&rs=1",
      cantidad: "4kg"
    },
    {
      id_animal: 1,
      nombre: "Juguete para perros 2",
      descripcion: "Peluche para perros con chirriador",
      precio: "6.50",
      id_marca: 6,
      id_proveedor: 106,
      id_categoria: 201,
      imagen: "https://th.bing.com/th/id/OIP.eTCbdR_AFzbqHMPXhrJWUQHaEK?pid=ImgDet&rs=1",
      cantidad: "1 unidad"
    },
    {
      id_animal: 2,
      nombre: "Comida para gatos 3",
      descripcion: "Comida de pescado para gatos adultos",
      precio: "12.99",
      id_marca: 7,
      id_proveedor: 107,
      id_categoria: 202,
      imagen: "https://th.bing.com/th/id/OIP.eTCbdR_AFzbqHMPXhrJWUQHaEK?pid=ImgDet&rs=1",
      cantidad: "900g"
    },
    {
      id_animal: 1,
      nombre: "Correa para perros 1",
      descripcion: "Correa resistente para perros grandes",
      precio: "14.99",
      id_marca: 8,
      id_proveedor: 108,
      id_categoria: 201,
      imagen: "https://th.bing.com/th/id/OIP.eTCbdR_AFzbqHMPXhrJWUQHaEK?pid=ImgDet&rs=1",
      cantidad: "1 unidad"
    },
    {
      id_animal: 2,
      nombre: "Arena para gatos 3",
      descripcion: "Arena aglomerante para gatos",
      precio: "9.99",
      id_marca: 2,
      id_proveedor: 102,
      id_categoria: 202,
      imagen: "https://th.bing.com/th/id/OIP.eTCbdR_AFzbqHMPXhrJWUQHaEK?pid=ImgDet&rs=1",
      cantidad: "5kg"
    },
    {
      id_animal: 1,
      nombre: "Juguete para perros 3",
      descripcion: "Pelota de tenis para perros",
      precio: "4.99",
      id_marca: 9,
      id_proveedor: 109,
      id_categoria: 201,
      imagen: "https://th.bing.com/th/id/OIP.eTCbdR_AFzbqHMPXhrJWUQHaEK?pid=ImgDet&rs=1",
      cantidad: "1 unidad"
    },
    {
      id_animal: 2,
      nombre: "Arena para gatos 3",
      descripcion: "Arena aglomerante para gatos",
      precio: "9.99",
      id_marca: 2,
      id_proveedor: 102,
      id_categoria: 202,
      imagen: "https://th.bing.com/th/id/OIP.eTCbdR_AFzbqHMPXhrJWUQHaEK?pid=ImgDet&rs=1",
      cantidad: "5kg"
    }

  ];

  constructor(private router: Router,
    private cache: Datos_Locales) { }

  ngOnInit() {
    this.marcasUnicas = this.obtenerMarcasUnicas();
  }

  mostar_todos = true;
  mostrar_marca = false;
  mostrar_nombre = false;
  ordenSeleccionado: string = 'Rango Precio';
  marcaSeleccionada: string = 'Todas';
  productosFiltradosMarcas: any[] = this.productos;
  productosFiltradosNombre: any[] = this.productos;
  marcasUnicas: string[] = [];
  nombreProducto: string = '';


  obtenerMarcasUnicas() {
    const marcasUnicas = new Set<string>();
    this.productos.forEach((producto: any) => {
      marcasUnicas.add(producto.id_marca);
    });
    return Array.from(marcasUnicas);
  }


  ordenarProductos() {
    if (this.ordenSeleccionado === 'mayor') {
      this.productos.sort((a: any, b: any) => parseFloat(b.precio) - parseFloat(a.precio));
    } else {
      this.productos.sort((a: any, b: any) => parseFloat(a.precio) - parseFloat(b.precio));
    }
  }

  filtrarPorMarca() {
    if (this.marcaSeleccionada === 'Todas') {
      this.productosFiltradosMarcas = this.productos;
      this.mostar_todos = true;
      this.mostrar_marca = false;
    } else {
      this.mostar_todos = false;
      this.mostrar_marca = true;
      this.productosFiltradosMarcas = this.productos.filter((producto: any) => {
        return producto.id_marca == this.marcaSeleccionada;
      });
    }
  }

  buscarPorNombre() {
    if (!this.nombreProducto) {
      this.mostar_todos = true;
      this.mostrar_nombre = false;
      this.productosFiltradosNombre = this.productos;
    } else {
      this.mostar_todos = false;
      this.mostrar_nombre = true;
      this.productosFiltradosNombre = this.productos.filter((producto: any) => {
        console.log(producto.nombre.toLowerCase().includes(this.nombreProducto.toLowerCase()));
        return producto.nombre.toLowerCase().includes(this.nombreProducto.toLowerCase());
      });
    }
  }

  SeleccionarProducto() {
    this.cache.guardar_ArregloLocal('producto', this.productosFiltradosNombre);
    this.router.navigate(['/producto']);
  }

}
