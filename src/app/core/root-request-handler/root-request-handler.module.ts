import { RootRequestHandlerComponent } from './root-request-handler.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const imports = [

];

const components = [
    RootRequestHandlerComponent
];

const routes: Routes = [
  {
    path: '',
    component: RootRequestHandlerComponent
  }
];

@NgModule({
  declarations: [components],
  imports: [
    imports,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RootRequestHandlerModule { }
