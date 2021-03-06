import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from '../datos.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private datos: DatosService, private router:Router) { }

  ngOnInit(): void {
  }

  salir(){
    this.datos.setCuenta('','');
    this.router.navigate(['']);
  }

}
