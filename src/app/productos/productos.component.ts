import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
  }

  products: string[] = ['Apple', 'Banana', 'Orange','Apple', 'Banana', 'Orange'];

}
