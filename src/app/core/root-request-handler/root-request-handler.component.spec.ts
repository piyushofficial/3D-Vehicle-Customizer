import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RootRequestHandlerComponent } from './root-request-handler.component';

describe('RootRequestHandlerComponent', () => {
  let component: RootRequestHandlerComponent;
  let fixture: ComponentFixture<RootRequestHandlerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RootRequestHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootRequestHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
