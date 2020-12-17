import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatosService } from '../datos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = '';
  pass = '';

  constructor(
    private toast: ToastrService,
    private datos: DatosService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  entrar() {
    this.datos.login(this.user, this.pass).subscribe(
      (success) => {
        
        if(success['auth']){
          this.datos.setCuenta(this.user, success['token']);
          this.router.navigate(['/productos']);
        }
        else{
          this.toast.error("Error de credenciales");
        }
       
      },
      (error) => {
        this.toast.error('Error de comunicación con la base de datos');
      }
    );
  }
}

