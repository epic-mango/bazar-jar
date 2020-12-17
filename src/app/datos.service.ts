import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Producto } from './productos/productos.component';

const URL: string = 'http://localhost/bazar-rest/';

@Injectable({
  providedIn: 'root',
})
export class DatosService {
  constructor(private http: HttpClient, private galleta: CookieService) {}
  private cuenta = { user: '', token: '' };

  getProductos() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this.cuenta.token);

    return this.http.get<any>(URL + 'productos.php', { headers: headers });
  }

  editarProducto(producto: Producto) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this.cuenta.token);


    let formData = new HttpParams();

      formData.append('id', producto.id + '');
      formData.append('nombre', producto.nombre);
      formData.append('precioCompra', producto.precioCompra + '');
      formData.append('precioVenta', producto.precioVenta + '');
      if (producto.imagen) formData.append('imagen', producto.imagen);
      formData.append('venta', producto.venta);


    if (producto.id == 0) {
      
      return this.http.post<any>(URL + 'productos.php', formData, {
        headers: headers,
      });
    } else {
      debugger;
      return this.http.put(URL + 'productos.php',null,{ headers: headers, params: formData });
    }
  }

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

  getCuenta() {
    this.cuenta.user = this.galleta.get('user');
    this.cuenta.token = this.galleta.get('token');

    return this.cuenta;
  }
}
