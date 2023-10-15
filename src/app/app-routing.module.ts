import { InventarioComponent } from './ui/inventario/inventario.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscanerComponent } from './ui/escaner/escaner.component';
import { HistorialComponent } from './ui/historial/historial.component';
import { InicioComponent } from './ui/inicio/inicio.component';
import { ProductoComponent } from './ui/producto/producto.component';
import { AgregarComponent } from './ui/agregar/agregar.component';

const routes: Routes = [
  { path: '', component: InicioComponent},
  { path: 'inicio', component: InicioComponent },
  { path: 'ventas', component: EscanerComponent},
  { path: 'historial_venta', component: HistorialComponent},
  { path: 'inventario', component: InventarioComponent},
  { path: 'producto', component: ProductoComponent},
  { path: 'agregar', component: AgregarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
