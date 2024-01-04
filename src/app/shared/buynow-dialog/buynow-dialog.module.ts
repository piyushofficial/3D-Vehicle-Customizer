import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuynowDialogComponent } from './buynow-dialog.component';
import { MaterialModule } from '../material/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

const component = BuynowDialogComponent

@NgModule({
  declarations: [component],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [component]
})
export class BuynowDialogModule { }
