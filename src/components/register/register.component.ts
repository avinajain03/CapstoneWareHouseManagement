import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  userName!: string;
  email!: string;
  password!: string;
  contact!: string;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    console.warn('component initialised!');
  }

  signup() {
    const requestBody = {
      userName: this.userName,
      email: this.email,
      password: this.password,
      contact: this.contact,
      role: 'vendor' 
    };

    this.http.post('http://localhost:8080/signup', requestBody)
      .subscribe((response: any) => {
        this.router.navigate(['/login']);
      });
  }

}
