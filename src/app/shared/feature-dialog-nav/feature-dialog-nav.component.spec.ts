import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureDialogNavComponent } from './feature-dialog-nav.component';

describe('FeatureDialogNavComponent', () => {
  let component: FeatureDialogNavComponent;
  let fixture: ComponentFixture<FeatureDialogNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureDialogNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureDialogNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
