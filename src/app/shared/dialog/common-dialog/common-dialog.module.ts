import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../../material/material-module';
import { CommonDialogComponent } from './common-dialog.component';

const component = CommonDialogComponent


@NgModule({
  declarations: [component],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
  ],
  exports: [component]
})
export class CommonDialogModule { }
