import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyCtaComponent } from './sticky-cta.component';

describe('StickyCtaComponent', () => {
  let component: StickyCtaComponent;
  let fixture: ComponentFixture<StickyCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickyCtaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickyCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
