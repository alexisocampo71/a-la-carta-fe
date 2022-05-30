import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { Dish } from 'src/app/models/dish';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {
  private id!: String
  public dish: Dish = new Object

  constructor(private route: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || ''
    this.searchService.getDish(Number(this.id)).subscribe(
      dish => {
        this.dish = dish
      }
    )
  }
}
