import { Component, OnInit } from '@angular/core';
import { Cache_Service } from '../services/cache.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(

      private datos_Locales: Cache_Service,
      private location: Location,
  ) { }

  ngOnInit(): void {
  }

  CerrarSesion() {
    this.datos_Locales.Actualizar_Login(false);
    this.datos_Locales.eliminarCacheNavegador();
    this.location.go('/Sistema/Registro');
  }


}
