import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  NativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatButtonToggleModule
} from '@angular/material';

const impExp = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule
];

@NgModule({
  declarations: [],
  imports: [...impExp, CommonModule],
  exports: [...impExp],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }]
})
export class MaterialModule {}