import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { users } from 'src/models/users';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: users[] = [];
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userRole$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  userId: string = null;

  constructor(private http: HttpClient) { 
    this.isLoggedIn$.next(false);
  }

  setUserRole(role: 'admin' | 'staff' | 'supplier' | 'vendor'): void {
    console.log('Setting user role to', role);
    this.userRole$.next(role);
  }
 
  getUserRole(): string {
    const userRole = this.userRole$.getValue();
    console.log('Getting user role:', userRole);
    return userRole;
  }

  setUser(user: string): void {
    console.log('setting user', user);
    
    this.userId = user;
  }
 
  getUser(): string {
    return this.userId;
  }

  setLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn$.next(isLoggedIn);
  }
 
  get isLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn$;
  }
}

