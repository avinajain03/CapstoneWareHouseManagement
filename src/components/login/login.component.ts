import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() loggedIn = new EventEmitter<boolean>();
  loginForm: FormGroup = null;
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'text/plain, */*',
      'Content-Type': 'application/json'
    }),
    responseType: 'text' as 'json'
  };

  constructor(private http: HttpClient, private router: Router, private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control(null, [Validators.required]),
      password: this.fb.control(null, [Validators.required])
    });

  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    const requestBody = this.loginForm.value;

    this.http.post('http://localhost:8080/login', requestBody, this.httpOptions)
      .subscribe((response: any) => {
        console.error(response);
        localStorage.setItem('userName', response.userName);
        localStorage.setItem('email', response.email);
        console.log('Response:', response);

        const user = JSON.parse(response);
        console.log(user);

        this.userService.setUser(user.userId);
        this.userService.setUserRole(user.role);
        this.userService.setLoggedIn(true);


        this.loggedIn.emit(true);
        this.router.navigate(['/home']);
        alert("Login success");
      }, (error: any) => {
        alert("Login failed. Please try again.");
      });
  }

  routeToRegisterPage(): void {
    this.router.navigateByUrl('/register');
  }


}