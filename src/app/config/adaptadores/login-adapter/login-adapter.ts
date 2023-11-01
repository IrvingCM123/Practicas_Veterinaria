import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginPort } from '../../puertos/login-puertos/login-ports';
import { Login_Entity } from 'src/app/domain/Login/models/Login.entity';

@Injectable({
  providedIn: 'root'
})
export class LoginAdapter implements LoginPort {
  api = environment.url+"/usuarios/login";

  constructor(private http: HttpClient) {}

  postLogin(email: string, password: string): Observable<Login_Entity> {
    return this.http.post<any>(this.api, {email, password});
  }

}
