import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { SeguridadGuard } from './seguridad.guard';

const routes: Routes = [
  {path: '**', component: LoginComponent},
{path: 'productos', component: ProductosComponent, canActivate: SeguridadGuard}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
