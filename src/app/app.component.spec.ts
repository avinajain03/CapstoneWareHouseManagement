import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { LoginComponent } from 'src/components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/services/user.service';


describe('AppComponent', () => {

  let userService: UserService;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [HttpClient, HttpHandler, UserService],
      declarations: [AppComponent, LoginComponent]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();

  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'WMSCapstoneAngular'`, () => {
    expect(component.title).toEqual('WMSCapstoneAngular');
  });



  it('should set isLoggedIn to the value passed in', () => { 
    const status = true; 
    component.onLoggedIn(status); 
    expect(component.isLoggedIn).toEqual(status); 
  });

});
