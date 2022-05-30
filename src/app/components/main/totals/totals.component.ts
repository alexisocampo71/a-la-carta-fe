import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { MenuTotals } from 'src/app/models/menu-totals';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.scss']
})
export class TotalsComponent implements OnDestroy{
  public totals!: MenuTotals
  private menuTotalsSubscription = new Subscription

  constructor(private state: StateService) { 
    this.menuTotalsSubscription = this.state.menuTotals.subscribe(
      totals => this.totals = totals
    )
  }

  ngOnDestroy(): void {
    this.menuTotalsSubscription.unsubscribe();
  }
}
