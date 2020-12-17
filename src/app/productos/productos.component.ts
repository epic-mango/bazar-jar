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

  ngOnInit(): void {
    this.llenarProductos();
  }

  llenarProductos() {
    this.datos.getProductos().subscribe(
      (success) => {
        this.products = success;
      },
      (error) => {}
    );
  }

  products: any;

  productoSeleccionado: Producto = {
    id: 0,
    nombre: '',
    precioCompra: undefined,
    precioVenta: undefined,
    venta: null,
    imagen: undefined,
  };

  setProductoSeleccionado(producto: any) {
    this.productoSeleccionado = producto;
    if (this.productoSeleccionado.imagen)
      this.imgEditar = this.productoSeleccionado.imagen;
  }

  imgEditar: string = '../../assets/ic_add.png';

  onFileSelected(event: any) {
    console.log(event);

    const reader = new FileReader();
    reader.onload = () => {
      this.imgEditar = reader.result as string;
      this.productoSeleccionado.imagen = reader.result as string;
    };

    let file: File = event.target.files[0];
    reader.readAsDataURL(file);
  }

  limpiarProductoSeleccionado() {
    this.productoSeleccionado = {
      id: 0,
      nombre: '',
      precioCompra: undefined,
      precioVenta: undefined,
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
    if (
      !this.productoSeleccionado.precioCompra ||
      this.productoSeleccionado.precioCompra <= 0
    ) {
      this.toast.error('Debes poner un precio de compra');
      correcto = false;
    }
    if (
      !this.productoSeleccionado.precioVenta ||
      this.productoSeleccionado.precioVenta <= 0
    ) {
      this.toast.error('Debes poner un precio de venta');
      correcto = false;
    }

    if (correcto)
      this.datos.editarProducto(this.productoSeleccionado).subscribe(
        (success) => {
          if (success['resultado'] == 'insertado') {
            this.productoSeleccionado.id = success['id'];

            let producto = JSON.parse(
              JSON.stringify(this.productoSeleccionado)
            );
            this.products.push(producto);

            this.toast.info(
              'Se ha añadido ' + this.productoSeleccionado.nombre
            );
            this.limpiarProductoSeleccionado();
          } else if (success['resultado'] == 'modificado') {
          }
        },
        (error: Object) => {
          this.llenarProductos();
          this.toast.error('No se han guardado los cambios')
        }
      );
  }
}

export interface Producto {
  id: number;
  nombre: string;
  precioCompra?: number;
  precioVenta?: number;
  imagen?: string;
  venta: any;
}
