import { Component, OnInit } from '@angular/core';
import { Cache_Service } from '../services/cache.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginUseCase } from 'src/app/domain/Login/usecase/getLogin';

import { Mensajes_Login } from 'src/app/helpers/Message.service';
import { TypeAlert } from 'src/app/helpers/TypeAlert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    private datosLocales: Cache_Service,
    private router: Router,
    private location: Location,
    private _IniciarSesion: LoginUseCase
  ) {}

  onSubmit() {}

  Correo_Usuario: string = '';
  Contrasena_Usuario: string = '';

  loginFailed: boolean = false;
  loggedIn: boolean = false;
  public Token: any;
  responseSuccessful = false;

  //Variables para mostrar las alertas de mensajes
  public MostrarAlertaPantalla: boolean = false;
  public MensajeAlertaPantalla: string = '';
  public TipoAlertaPantalla: string = '';

  //Difuminar pantalla
  public OcultarPantalla: boolean = false;

  async login(usuario: string, contraseña: string) {
    try {
      const Resp: any = await this._IniciarSesion.postLogin(usuario, contraseña).toPromise();

      if (Resp.token != null || Resp.token != undefined) {
        this.loggedIn = true;
        this.Token = Resp.token;
        this.datosLocales.guardar_DatoLocal('Token', this.Token);
        this.responseSuccessful = true;
      } else {
        this.responseSuccessful = false;
      }
    } catch (error) {
      this.responseSuccessful = false;
      this.MensajeAlertaPantalla = Mensajes_Login.Login_Error;
      this.TipoAlertaPantalla = TypeAlert.Alert_Error;
      this.MostrarAlertaPantalla = true;
      this.OcultarPantalla = true;
    }
    return this.responseSuccessful;
  }


  async IniciarSesion() {
    const loginSuccessful = await this.login(
      this.Correo_Usuario,
      this.Contrasena_Usuario
    );
    if (loginSuccessful) {
      this.datosLocales.Actualizar_Login(true);
      this.datosLocales.guardar_DatoLocal('login', true);
      this.router.navigate(['/inicio/']);
    } else {
      this.datosLocales.Actualizar_Login(false);
      this.loginFailed = true;
      this.loggedIn = false;

      this.MensajeAlertaPantalla = Mensajes_Login.Login_Error;
      this.TipoAlertaPantalla = TypeAlert.Alert_Error;
      this.MostrarAlertaPantalla = true;
      this.OcultarPantalla = true;
      setTimeout(() => {
        this.MostrarAlertaPantalla = false;
        this.OcultarPantalla = false;
      }, 1000);
    }
  }

  updateUsername(event: Event): void {
    this.Correo_Usuario = (event.target as HTMLInputElement).value;
  }

  updatePassword(event: Event): void {
    this.Contrasena_Usuario = (event.target as HTMLInputElement).value;
  }
}
