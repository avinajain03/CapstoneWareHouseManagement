import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClient, HttpHandler } from '@angular/common/http';


describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set user role', () => {
    service.setUserRole('admin');
    expect(service.getUserRole()).toEqual('admin');
  });

  it('should set user id', () => {
    service.setUser('654e6355515f1a5f2ceeba19');
    expect(service.getUser()).toEqual('654e6355515f1a5f2ceeba19');
  });

  it('should set logged in status', () => {
    const loggedIn = true;
    service.setLoggedIn(loggedIn);
    expect(service.isLoggedIn$.getValue()).toEqual(loggedIn);
  });

  
});
