import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './utilitarios/app-init';

import { RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { NavegacaoComponent } from './componentes/navegacao/navegacao.component';

import { MaterialModule } from './utilitarios/material.module';
import { HomeComponent } from './componentes/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ROUTES} from './app.routes'

@NgModule({
  declarations: [
    AppComponent,
    NavegacaoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializer,
    multi: true,
    deps: [KeycloakService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
