import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';

const component = LoaderComponent

@NgModule({
  declarations: [component],
  imports: [
    CommonModule
  ],
  exports: [component]
})
export class LoaderModule { }
