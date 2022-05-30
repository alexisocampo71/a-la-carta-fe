import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnDestroy {
  private isLoggedInSubscription = new Subscription();
  public globalState: Boolean = false;
  
  constructor(private state: StateService, private authService: AuthService) {
    this.isLoggedInSubscription = this.state.isLoggedIn$.subscribe((value) => {
      this.globalState = value
    })
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }

  public logout(): void {
    this.authService.logOut();
  }
}
