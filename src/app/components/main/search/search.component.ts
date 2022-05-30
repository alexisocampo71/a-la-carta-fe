import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { StateService } from 'src/app/services/state.service';
import Swal from 'sweetalert2';
import { Results } from 'src/app/models/results';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnDestroy {
  public searching: Boolean = false;
  public searchResults = new Array
  private dishesToCheck = new Array
  private notVegan: number = 0
  private menuDishesSubscription = new Subscription()
  
  constructor(private searchService: SearchService, private state: StateService) {
    this.menuDishesSubscription = this.state.menuDishes.subscribe(menuDishes => this.dishesToCheck = menuDishes)
  }

  ngOnDestroy(): void {
    this.menuDishesSubscription.unsubscribe();
  }

  public addResults(results: Results): void {
    this.searching = true
    this.searchResults = []
    if(results.results) {
      results.results.map((result: Object) => this.searchResults.push(result))
    }
  }

  public addDish(id: Number): void {
    this.notVegan = 0
    this.searchService.getDish(id).subscribe(
      result => {
        this.dishesToCheck.push(result)
        this.dishesToCheck.map(dish => {
          //count not-vegan dishes
          if (dish.vegan === false) {
            this.notVegan += 1;
          }
        })
        //check number of dishes before adding to menu
        if (this.dishesToCheck.length > 4) {
          this.alert('El menú no puede contener más de cuatro platos')
          this.dishesToCheck.pop()
          return
        }
        //check number of not-vegan dishes before adding to menu
        if (this.notVegan > 2) {
          this.alert('Dos platos del menú deben ser veganos')
          this.dishesToCheck.pop()
          return
        }
        this.state.menuDishes.next(this.dishesToCheck)
        this.searching = false
        this.searchResults = []
      }
    )
  }

  private alert(message: string): void {
    Swal.fire({
      icon: "error",
      title: 'Oops...',
      text: message,
    });
  }
}
