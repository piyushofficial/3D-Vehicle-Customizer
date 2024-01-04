import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StickyCtaComponent } from './sticky-cta.component';
import { MaterialModule } from '../material/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BuynowDialogModule } from '../buynow-dialog/buynow-dialog.module';

const component = StickyCtaComponent

@NgModule({
  declarations: [component],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    BuynowDialogModule
  ],
  exports: [component]
})
export class StickyCtaModule { }
