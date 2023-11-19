import { Component, OnInit, OnDestroy} from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WMSCapstoneAngular';

  isLoggedIn = false;
  subscriptions: Subscription[] = []
  constructor(private userService: UserService) {}
 
  ngOnInit(): void {
    this.subscriptions.push(
      this.userService.isLoggedIn.subscribe(value => {
        console.log('isLoggedIn:', value);
        this.isLoggedIn = value;
      })
    );
  }
 
  ngOnDestroy(): void {
      this.subscriptions.forEach(s => s?.unsubscribe());
  }
 

  onLoggedIn(status: boolean) {
    this.isLoggedIn = status;
  }


}
