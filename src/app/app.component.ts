import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "moment-timezone";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(router: Router) {
    window['router'] = router;
   }
 
  ngOnInit() { }
}
