import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeModule } from "./home/home.module";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/showroom",
    pathMatch: "full",
  },
  {
    path: "showroom",
    loadChildren: () =>
      import("./home/showroom/showroom.module").then((m) => m.ShowroomModule),
  },
  {
    path: "product",
    loadChildren: () =>
      import("./home/product-configure/product-configure.module").then(
        (m) => m.ProductConfigureModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { useHash: true }), HomeModule],
  exports: [RouterModule],
})
export class PagesModule {}
