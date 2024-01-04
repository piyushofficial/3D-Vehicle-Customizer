import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { PanoViewerModule } from 'src/app/shared/pano-viewer/pano-viewer.module';
import { ShowroomComponent } from './showroom.component';

const components = [
  ShowroomComponent
];

const routes: Routes = [
  {
    path: '',
    component: ShowroomComponent
  }
];



@NgModule({
  declarations: [ShowroomComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    PanoViewerModule,
    RouterModule.forChild(routes),
  ]
})
export class ShowroomModule { }
