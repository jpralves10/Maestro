import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material';
import { MaterialModule } from '../../utilitarios/material.module'

import { CONFORMIDADE_ROUTES } from './conformidade.routes';

import { FilterComponent } from './filter/filter.component';
import { ResultComponent } from './result/result.component';
import { ImportersListComponent } from './filter/importers-list/importers-list.component';

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
    ImportersListComponent
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
    MaterialModule,
    MatInputModule,
    RouterModule.forChild(CONFORMIDADE_ROUTES),
    //GoogleChartsModule.forRoot()
  ]
})
export class ConformidadeModule { }
