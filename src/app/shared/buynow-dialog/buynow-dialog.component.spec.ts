import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuynowDialogComponent } from './buynow-dialog.component';

describe('BuynowDialogComponent', () => {
  let component: BuynowDialogComponent;
  let fixture: ComponentFixture<BuynowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuynowDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuynowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
