import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from './session.service';
import { InjectorResolver } from '../injector/injector.service';

export function sessionProviderFactory(injectorResolver: InjectorResolver, session: SessionService) {
  return () => session.init();
}

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule
  ]
})
export class SessionModule { }
