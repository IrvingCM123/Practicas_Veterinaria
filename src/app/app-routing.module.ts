import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscanerComponent } from './ui/escaner/escaner.component';
import { HistorialComponent } from './ui/historial/historial.component';

const routes: Routes = [
  { path: 'ventas', component: EscanerComponent},
  { path: 'historial_venta', component: HistorialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
