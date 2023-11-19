import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Subscription, config } from 'rxjs';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, OnDestroy{

  isLoggedIn = false;
  isAdmin = false;
  isVendor = false;
  isSupplier = false;
  isStaff = false;
  subscriptions: Subscription[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    console.log('TopBarComponent initialized!');

    this.subscriptions.push(this.userService.isLoggedIn.subscribe(value => {
      console.log('isLoggedIn:', value);
      this.isLoggedIn = value;
    }));

    this.subscriptions.push(this.userService.userRole$.subscribe(role => {
      console.log('userRole:', role);
      this.isAdmin = (role == "admin");
      console.log('is Admin', this.isAdmin);
      
      this.isVendor = (role == "vendor");
      console.log('is vendor', this.isVendor);
      
      this.isSupplier = (role == "supplier");
      console.log('is supplier', this.isSupplier);
      
      this.isStaff = (role == "staff");
      console.log('is staff', this.isStaff);
      
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s?.unsubscribe());
  }

}
