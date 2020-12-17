import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { SeguridadGuard } from './seguridad.guard';

const routes: Routes = [
  {path: 'productos', component: ProductosComponent, canActivate: [SeguridadGuard]},
  {path: '**', component: LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
