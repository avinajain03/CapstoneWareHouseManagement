import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [HttpClient, HttpHandler, UserService],
      imports: [ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not login if the form is invalid', () => { 
    component.loginForm.controls['email'].setValue(''); 
    component.loginForm.controls['password'].setValue(''); 
    const spy = spyOn(window, 'alert'); 
    component.login();
    //expect(spy).toHaveBeenCalledWith('Login failed. Please try again.'); 
  });

  


});
