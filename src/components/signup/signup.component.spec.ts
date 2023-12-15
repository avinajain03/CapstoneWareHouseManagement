import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SignupComponent } from './signup.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy
        },
        {
          provide: Router,
          useValue: routerSpy
        }
      ]
    });
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create correct requestBody', () => {
    component.userName = 'testUser';
    component.email = 'test@gmail.com';
    component.password = 'test12345';
    component.contact = '+919876543210';

    const expectedRequestBody = {
      userName: 'testUser',
      email: 'test@gmail.com',
      password: 'test12345',
      contact: '+919876543210',
      role: 'vendor'
    };
    httpClientSpy.post.and.returnValue(of({}));
    component.signup();
    expect(httpClientSpy.post).toHaveBeenCalledWith('http://localhost:8080/signup', expectedRequestBody);
  });

  it('should make post api call on signup', () => {
    httpClientSpy.post.and.returnValue(of({}));
    component.signup();
    expect(httpClientSpy.post).toHaveBeenCalled();
  });
});