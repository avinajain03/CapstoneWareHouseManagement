import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierDetailsComponent } from './supplier-details.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SupplierDetailsComponent', () => {
  let component: SupplierDetailsComponent;
  let fixture: ComponentFixture<SupplierDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierDetailsComponent],
      providers: [HttpClient, HttpHandler]
    });
    fixture = TestBed.createComponent(SupplierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
