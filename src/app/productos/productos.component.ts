import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { DatosService } from '../datos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  constructor(
    private plataformLocation: PlatformLocation,
    private datos: DatosService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  products: string[] = ['Ajo', 'Bistec', 'Chorizo', 'Durazno', 'E'];

  productoSeleccionado: Producto = {
    id: 0,
    nombre: '',
    precioCompra: 0,
    precioVenta: 0,
    venta: null,
    imagen: undefined,
  };
  imgEditar: string = '../../assets/ic_add.png';

  onFileSelected(event: any) {
    console.log(event);

    const reader = new FileReader();
    reader.onload = () => {
      this.imgEditar = reader.result as string;
    };

    let file: File = event.target.files[0];
    this.productoSeleccionado.imagen = file;

    reader.readAsDataURL(file);
  }

  limpiarProductoSeleccionado() {
    this.productoSeleccionado = {
      id: 0,
      nombre: '',
      precioCompra: 0,
      precioVenta: 0,
      venta: null,
      imagen: undefined,
    };
    this.imgEditar = '../../assets/ic_add.png';
  }

  editarProducto() {
    let correcto = true;
    if (this.productoSeleccionado.imagen == undefined) {
      this.toast.error('No has seleccionado una imagen');
      correcto = false;
    }
    if (this.productoSeleccionado.nombre == '') {
      this.toast.error('Debes poner un nombre a tu producto');
      correcto = false;
    }
    if (this.productoSeleccionado.precioCompra <= 0) {
      this.toast.error('Debes poner un precio de compra');
      correcto = false;
    }
    if (this.productoSeleccionado.precioVenta <= 0) {
      this.toast.error('Debes poner un precio de venta');
      correcto = false;
    }

    if (correcto) this.datos.editarProducto(this.productoSeleccionado);
  }
}

export interface Producto {
  id: number;
  nombre: string;
  precioCompra: number;
  precioVenta: number;
  imagen?: File;
  venta: any;
}
