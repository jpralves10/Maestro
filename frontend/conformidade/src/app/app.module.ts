import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './utilitarios/app-init';

import { HttpClientModule } from '@angular/common/http';

import { RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { NavegacaoComponent } from './componentes/navegacao/navegacao.component';

import { MaterialModule } from './utilitarios/material.module';
import { HomeComponent } from './componentes/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ROUTES } from './app.routes';
import { ConformidadeModule } from './componentes/conformidade/conformidade.module';

@NgModule({
    declarations: [
        AppComponent,
        NavegacaoComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        MaterialModule,
        ConformidadeModule,
        BrowserAnimationsModule,
        KeycloakAngularModule,
        HttpClientModule,
        RouterModule.forRoot(ROUTES, {useHash: true})
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializer,
            multi: true,
            deps: [KeycloakService]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }