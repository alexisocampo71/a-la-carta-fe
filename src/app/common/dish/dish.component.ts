import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnDestroy {
  @Input() title!: String 
  @Input() search: Boolean = true;
  @Input() id!: Number
  @Input() image!: String
  @Input() healthScore!: Number
  @Input() pricePerServing!: Number
  @Input() readyInMinutes!: Number

  private dishesSubscription = new Subscription();
  private menuDishes = new Array;

  constructor(private state: StateService) {
    this.dishesSubscription = this.state.menuDishes.subscribe(
      dishes => this.menuDishes = dishes
    )
  }

  ngOnDestroy(): void {
    this.dishesSubscription.unsubscribe();
  }

  public deleteDish(id: Number): void {
    for (let i = 0; i < this.menuDishes.length; i++) {
      if (this.menuDishes[i].id === id) {
        this.menuDishes.splice(i, 1);
        this.state.menuDishes.next(this.menuDishes);
        break
      }
    }
  }
}
