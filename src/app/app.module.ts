import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireAuthModule  } from '@angular/fire/compat/auth';
import { FirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { EscanerPort } from './config/puertos/escaner-puertos/escaner-ports';
import { EscanerAdapter } from './config/adaptadores/escaner-adapter/escaner-adapter';
import { GenerarCodigoBarrasComponent } from './ui/generar-codigo-barras/generar-codigo-barras.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { HistorialVentasComponent } from './ui/historial-ventas/historial-ventas.component';
import { VentaPort } from './config/puertos/venta-puertos/venta-ports';
import { VentasAdapter } from './config/adaptadores/venta-adapter/venta-adapter';
import { HistorialComponent } from './ui/historial/historial.component';
import { GraficasComponent } from './ui/graficas/graficas.component';
import { InicioComponent } from './ui/inicio/inicio.component';
import { InventarioComponent } from './ui/inventario/inventario.component';
import { ProductoComponent } from './ui/producto/producto.component';
import { InventarioPort } from './config/puertos/inventario-puertos/inventario-ports';
import { InventarioAdapter } from './config/adaptadores/inventario-adapter/inventario-adapter';
import { AgregarComponent } from './ui/agregar/agregar.component';
import { EscanerComponent } from './ui/escaner/escaner.component';
import { ProductoPort } from './config/puertos/producto-puertos/producto-puerto';
import { ProductoAdapter } from './config/adaptadores/producto-adapter/producto-adapter';
import { InfoProdPort } from './config/puertos/infoProd-puertos/infoProd-ports';
import { InfoProdAdapter } from './config/adaptadores/infoProd-adapter/infoProd-adapter';
import { LoginComponent } from './ui/login/login.component';
import { LoginPort } from './config/puertos/login-puertos/login-ports';
import { LoginAdapter } from './config/adaptadores/login-adapter/login-adapter';



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
    InventarioComponent,
    ProductoComponent,
    AgregarComponent,
    LoginComponent
  ],
  imports: [
    AngularFireAuthModule,
    FirestoreModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    CommonModule,
  ],
  providers: [
    {provide: EscanerPort, useClass: EscanerAdapter},
    {provide: VentaPort, useClass: VentasAdapter},
    {provide: InventarioPort, useClass: InventarioAdapter},
    {provide: ProductoPort, useClass: ProductoAdapter},
    {provide: InfoProdPort, useClass: InfoProdAdapter},
    {provide: LoginPort, useClass: LoginAdapter}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
