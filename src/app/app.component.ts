import { Component, OnInit } from '@angular/core';
import { Cache_Service } from './ui/services/cache.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Veterinaria';

  loggedIn: boolean = false;

  constructor(
    private datosLocales: Cache_Service,
  ) { }

  async ngOnInit() {

  const cachedLoggedIn = await this.datosLocales.obtener_DatoLocal('login');
  if (cachedLoggedIn) {
    //this.loggedIn = cachedLoggedIn;
    this.loggedIn = true;
  }

  this.datosLocales.loggedIn$.subscribe(loggedIn => {
    this.loggedIn = loggedIn;
  });

  }

}
