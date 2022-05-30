import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-menu-dishes',
  templateUrl: './menu-dishes.component.html',
  styleUrls: ['./menu-dishes.component.scss']
})
export class MenuDishesComponent implements OnDestroy {
  public menuDishes = new Array;
  private dishesSubscription = new Subscription();

  constructor(private state: StateService) { 
    this.dishesSubscription = this.state.menuDishes.subscribe(
      dishes => {
        this.menuDishes = dishes
        let totalPrice = 0
        let totalHealthScore = 0
        let totalMinutes = 0
        this.menuDishes.map(dish => {
          totalPrice += dish.pricePerServing
          totalHealthScore += dish.healthScore
          totalMinutes += dish.readyInMinutes
        })
        this.state.menuTotals.next({
          menuPrice: totalPrice,
          menuHealthScore: totalHealthScore / this.menuDishes.length,
          menuMinutes: totalMinutes / this.menuDishes.length
        })
      }
    )
  }

  ngOnDestroy(): void {
    this.dishesSubscription.unsubscribe();
  }
}
