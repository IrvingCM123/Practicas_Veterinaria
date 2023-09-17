import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generar-codigo-barras',
  templateUrl: './generar-codigo-barras.component.html',
  styleUrls: ['./generar-codigo-barras.component.scss']
})
export class GenerarCodigoBarrasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(navigator.mediaDevices.getUserMedia())
  }


}
