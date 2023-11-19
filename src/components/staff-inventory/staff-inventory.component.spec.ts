import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffInventoryComponent } from './staff-inventory.component';

describe('StaffInventoryComponent', () => {
  let component: StaffInventoryComponent;
  let fixture: ComponentFixture<StaffInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffInventoryComponent]
    });
    fixture = TestBed.createComponent(StaffInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
