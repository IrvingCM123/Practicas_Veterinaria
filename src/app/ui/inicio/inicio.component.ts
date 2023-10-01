import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  images = [
    {
      id: 1,
      imageUrl: 'https://picsum.photos/id/1041/800/450',
      caption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      credit: 'Photo: Tim Marshall',
    },
    {
      id: 2,
      imageUrl: 'https://picsum.photos/id/1043/800/450',
      caption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      credit: 'Photo: Christian Joudrey',
    },
    // Agrega más objetos aquí para cada imagen
  ];

  constructor() { }

  ngOnInit(): void {
  }



}
