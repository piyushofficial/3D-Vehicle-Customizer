import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanoViewerComponent } from './pano-viewer.component';

const component = PanoViewerComponent

@NgModule({
  declarations: [component],
  imports: [
    CommonModule
  ],
  exports: [component]
})
export class PanoViewerModule { }
