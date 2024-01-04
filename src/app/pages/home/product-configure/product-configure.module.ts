import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { RouterModule, Routes } from "@angular/router";
import { FeatureDialogNavModule } from "src/app/shared/feature-dialog-nav/feature-dialog-nav.module";
import { LoaderModule } from "src/app/shared/loader/loader.module";
import { MaterialModule } from "src/app/shared/material/material-module";
import { StickyCtaModule } from "src/app/shared/sticky-cta/sticky-cta.module";
import { ProductConfigureComponent } from "./product-configure.component";

const Route: Routes = [
  {
    path: "",
    component: ProductConfigureComponent,
  },
];

@NgModule({
  declarations: [ProductConfigureComponent],
  imports: [CommonModule,
    FlexLayoutModule,
    FeatureDialogNavModule,
    StickyCtaModule,
    MaterialModule,
    MatButtonToggleModule,
    LoaderModule,
    RouterModule.forChild(Route), MaterialModule],
})
export class ProductConfigureModule { }
