import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConfigureComponent } from './product-configure.component';

describe('ProductConfigureComponent', () => {
  let component: ProductConfigureComponent;
  let fixture: ComponentFixture<ProductConfigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductConfigureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
