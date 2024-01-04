import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material-module';
import { RouterModule } from '@angular/router';
import { FeatureDialogNavComponent } from './feature-dialog-nav.component';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [FeatureDialogNavComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [RouterModule, MaterialModule]
})
export class FeatureDialogNavModule { }
