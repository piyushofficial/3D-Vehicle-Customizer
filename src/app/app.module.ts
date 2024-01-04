import { HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { LoggerModule } from "ngx-logger";
import { AppComponent } from "./app.component";
import { InjectorResolver } from "./core/injector/injector.service";
import { sessionProviderFactory } from "./core/session/session.module";
import { SessionService } from "./core/session/session.service";
import { PagesModule } from "./pages/pages.module";
import { MaterialModule } from "./shared/material/material-module";
// import { FeatureDialogNavModule } from "./shared/feature-dialog-nav/feature-dialog-nav.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    LoggerModule.forRoot(null),
    PagesModule,
    RouterModule,
    MaterialModule,
    // FeatureDialogNavModule
  ],
  providers: [
    SessionService,
    {
      provide: APP_INITIALIZER,
      useFactory: sessionProviderFactory,
      deps: [InjectorResolver, SessionService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
