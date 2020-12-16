import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

const URL: string = 'http://localhost/bazar-rest/';

@Injectable({
  providedIn: 'root',
})
export class DatosService {
  
  constructor(private http: HttpClient, private galleta: CookieService) {}
  private cuenta = { user: '', token: '' };

  login(user: string, pass: string) {
    let Params = new HttpParams();
    Params = Params.append('user', user);
    Params = Params.append('pass', pass);

    return this.http.get<any>(URL + 'login.php', { params: Params });
  }

  setCuenta(user: string, token: string) {
    this.cuenta.user = user;
    this.cuenta.token = token;
    this.galleta.set('user', user);
    this.galleta.set('token', token);
  }

  getCuenta(){
    this.cuenta.user = this.galleta.get('user');
    this.cuenta.token = this.galleta.get('token');

    return this.cuenta;
  }
}
