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
      imageUrl: 'https://www.dailypaws.com/thmb/DQfQglzyKWlVSlsDwKPprF2iMSg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/golden-retriever-177213599-2000-a30830f4d2b24635a5d01b3c5c64b9ef.jpg',
      raza: 'Golden Retriever',
      peso_ideal: '25-32 kg',
      altura_ideal: '51-61 cm',
      esperanza_vida: '10-12 años',
      origen: 'Escocia',
      caracter: 'Amigable, Inteligente, Devoto',
      problemas_saludables: 'Cáncer, Displasia de cadera, Enfermedad cardíaca',
      condiciones_favorables: 'Casa con patio, Casa con jardín, Casa con niños',
    },
    {
      id: 2,
      imageUrl: 'https://www.dailypaws.com/thmb/DQfQglzyKWlVSlsDwKPprF2iMSg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/golden-retriever-177213599-2000-a30830f4d2b24635a5d01b3c5c64b9ef.jpg',
      raza: 'Pug',
      peso_ideal: '6-8 kg',
      altura_ideal: '25-28 cm',
      esperanza_vida: '12-15 años',
      origen: 'China',
      caracter: 'Amigable, Juguetón, Sociable',
      problemas_saludables: 'Displasia de cadera, Enfermedad cardíaca, Obesidad',
      condiciones_favorables: 'Apartamento, Casa con niños, Casa con patio',
    },
    {
      id: 3,
      imageUrl: 'https://www.dailypaws.com/thmb/DQfQglzyKWlVSlsDwKPprF2iMSg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/golden-retriever-177213599-2000-a30830f4d2b24635a5d01b3c5c64b9ef.jpg',
      raza: 'Bulldog',
      peso_ideal: '18-25 kg',
      altura_ideal: '31-40 cm',
      esperanza_vida: '8-10 años',
      origen: 'Inglaterra',
      caracter: 'Amigable, Paciente, Juguetón',
      problemas_saludables: 'Displasia de cadera, Enfermedad cardíaca, Obesidad',
      condiciones_favorables: 'Apartamento, Casa con niños, Casa con patio',
    },
    {
      id: 4,
      imageUrl: 'https://www.dailypaws.com/thmb/DQfQglzyKWlVSlsDwKPprF2iMSg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/golden-retriever-177213599-2000-a30830f4d2b24635a5d01b3c5c64b9ef.jpg',
      raza: 'Beagle',
      peso_ideal: '9-11 kg',
      altura_ideal: '33-41 cm',
      esperanza_vida: '12-15 años',
      origen: 'Inglaterra',
      caracter: 'Amigable, Inteligente, Alegre',
      problemas_saludables: 'Displasia de cadera, Enfermedad cardíaca, Obesidad, Epilepsia, Glaucoma',
      condiciones_favorables: 'Apartamento, Casa con niños, Casa con patio',
    },
    {
      id: 5,
      imageUrl: 'https://www.dailypaws.com/thmb/DQfQglzyKWlVSlsDwKPprF2iMSg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/golden-retriever-177213599-2000-a30830f4d2b24635a5d01b3c5c64b9ef.jpg',
      raza: 'Chihuahua',
      peso_ideal: '1-3 kg',
      altura_ideal: '15-23 cm',
      esperanza_vida: '12-20 años',
      origen: 'México',
      caracter: 'Valientes , Audaces, Devoto, Alertas, Entusiastas, Independientes, Sensibles al frio',
      problemas_saludables: 'Problemas Dentales, Luxación Rotuliana, Hipoglucemia, Problemas Respiratorios',
      condiciones_favorables: 'Apartamento, Casa con niños, Casa con patio',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }



}
