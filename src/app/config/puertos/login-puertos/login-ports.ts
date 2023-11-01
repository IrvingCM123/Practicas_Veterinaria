import { Login_Entity } from "src/app/domain/Login/models/Login.entity";
import { Observable, observable } from "rxjs";

export abstract class LoginPort {
  abstract postLogin(Correo_Usuario: any, Contrasena_Usuario: any) : Observable<Login_Entity>;
}
