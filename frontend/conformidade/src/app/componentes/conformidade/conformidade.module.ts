import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { 
    MatInputModule, 
    MatChipsModule, 
    MatSelectModule,
    MatFormFieldModule,
    MatGridListModule,
    MatButtonModule,
    MatRippleModule,
    MatExpansionModule,
    MatStepperModule
} from '@angular/material';

import { MaterialModule } from '../utilitarios/material.module'

import {NgxMaskModule} from 'ngx-mask'

// Add these
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far);

import { CONFORMIDADE_ROUTES } from './conformidade.routes';

import { FilterComponent } from './filter/filter.component';
import { ResultComponent } from './result/result.component';
import { ImportersListComponent } from './filter/importers-list/importers-list.component';
import { ProdutosListComponent } from './result/produtos-list/produtos-list.component';
import { ProdutosEditComponent } from './result/produtos-edit/produtos-edit.component';
import { ProdutosOneComponent } from './result/produtos-edit/produtos-one/produtos-one.component';
import { ProdutosTwoComponent } from './result/produtos-edit/produtos-two/produtos-two.component';
import { ProdutosThreeComponent } from './result/produtos-edit/produtos-three/produtos-three.component';

/*import { ImportersListComponent } from './filter/importers-list/importers-list.component';

import { RepresentativesListComponent } from './filter/representatives-list/representatives-list.component';
import { EntryUrfListComponent } from './filter/entry-urf-list/entry-urf-list.component';
import { ClearanceUrfListComponent } from './filter/clearance-urf-list/clearance-urf-list.component';

import { GoogleChartsModule } from 'angular-google-charts';

import { SankeyComponent } from './result/sankey/sankey.component';
import { HonorariosComponent } from './result/honorarios/honorarios.component';
import { TrendlineChartComponent } from './result/trendline-chart/trendline-chart.component';*/

@NgModule({
  declarations: [
    FilterComponent,
    ResultComponent,
    ImportersListComponent,
    ProdutosListComponent,
    ProdutosEditComponent,
    ProdutosOneComponent,
    ProdutosTwoComponent,
    ProdutosThreeComponent
    /*ImportersListComponent,
    RepresentativesListComponent,
    EntryUrfListComponent,
    ClearanceUrfListComponent,
    SankeyComponent,
    HonorariosComponent,
    TrendlineChartComponent*/
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatGridListModule,
    MatButtonModule,
    MatRippleModule,
    MatExpansionModule,
    MatStepperModule,
    RouterModule.forChild(CONFORMIDADE_ROUTES),
    NgxMaskModule.forRoot()
    //GoogleChartsModule.forRoot()
  ]
})
export class ConformidadeModule { }
