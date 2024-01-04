import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { ShowroomModule } from "./showroom/showroom.module";
// import { ProductConfigureComponent } from "./product-configure/product-configure.component";
import { ProductConfigureModule } from "./product-configure/product-configure.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, ShowroomModule, ProductConfigureModule,],
})
export class HomeModule {}
