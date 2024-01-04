import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-root-request-handler',
  template: ''
})
export class RootRequestHandlerComponent implements OnInit {

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    const me = this;
  }

}
