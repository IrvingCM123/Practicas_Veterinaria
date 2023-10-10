import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent  implements AfterViewInit {

  productos: any = [
    {
      id_animal: 1,
      nombre: "Comida para perros 1",
      descripcion: "Comida balanceada para perros adultos",
      precio: "20.99",
      id_marca: 1,
      id_proveedor: 101,
      id_categoria: 201,
      imagen: "perro_comida_1.jpg",
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
      imagen: "gato_arena_1.jpg",
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
      imagen: "perro_pelota_1.jpg",
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
      imagen: "gato_comida_2.jpg",
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
      imagen: "perro_collar_1.jpg",
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
      imagen: "gato_arena_2.jpg",
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
      imagen: "perro_peluche_1.jpg",
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
      imagen: "gato_comida_3.jpg",
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
      imagen: "perro_correa_1.jpg",
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
      imagen: "gato_arena_3.jpg",
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
      imagen: "perro_pelota_2.jpg",
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
      imagen: "gato_arena_3.jpg",
      cantidad: "5kg"
    }

  ];

  @ViewChild('contenedorperros') contenedorProductos!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    this.addMouseDragScroll();
  }

  addMouseDragScroll() {
    const contenedor = this.contenedorProductos.nativeElement;

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    contenedor.addEventListener('mousedown', (e: any) => {
      isDragging = true;
      startX = e.pageX - contenedor.offsetLeft;
      scrollLeft = contenedor.scrollLeft;
    });

    contenedor.addEventListener('mouseleave', () => {
      isDragging = false;
    });

    contenedor.addEventListener('mouseup', () => {
      isDragging = false;
    });

    contenedor.addEventListener('mousemove', (e: any) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - contenedor.offsetLeft;
      const walk = (x - startX) * 2; // Ajusta la velocidad de desplazamiento
      contenedor.scrollLeft = scrollLeft - walk;
    });
  }
}
