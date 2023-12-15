import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarComponent } from './topbar.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopbarComponent],
      providers: [HttpClient, HttpHandler]
    });
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
