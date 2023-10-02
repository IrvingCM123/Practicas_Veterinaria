import { EscanerComponent } from './ui/escaner/escaner.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EscanerPort } from './config/puertos/escaner-puertos/escaner-ports';
import { EscanerAdapter } from './config/adaptadores/escaner-adapter/escaner-adapter';
import { CommonModule } from '@angular/common';
import { GenerarCodigoBarrasComponent } from './ui/generar-codigo-barras/generar-codigo-barras.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { HistorialVentasComponent } from './historial-ventas/historial-ventas.component';
import { VentaPort } from './config/puertos/venta-puertos/venta-ports';
import { VentaAdapter } from './config/adaptadores/historial-adapter/venta-adapter';
import { HistorialComponent } from './ui/historial/historial.component';
import { GraficasComponent } from './ui/graficas/graficas.component';
import { InicioComponent } from './ui/inicio/inicio.component';
@NgModule({
  declarations: [
    AppComponent,
    EscanerComponent,
    GenerarCodigoBarrasComponent,
    HeaderComponent,
    FooterComponent,
    HistorialVentasComponent,
    HistorialComponent,
    GraficasComponent,
    InicioComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [
    {provide: EscanerPort, useClass: EscanerAdapter},
    {provide: VentaPort, useClass: VentaAdapter}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
