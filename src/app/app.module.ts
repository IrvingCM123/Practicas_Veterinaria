import { EscanerComponent } from './ui/escaner/escaner.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EscanerPort } from './config/puertos/escaner-puertos/escaner-ports';
import { EscanerAdapter } from './config/adaptadores/escaner-adapter/escaner-adapter';
import { CommonModule } from '@angular/common';
import { GenerarCodigoBarrasComponent } from './ui/generar-codigo-barras/generar-codigo-barras.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    EscanerComponent,
    GenerarCodigoBarrasComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ZXingScannerModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [
    {provide: EscanerPort, useClass: EscanerAdapter},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
