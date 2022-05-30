import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Subscription } from 'rxjs';
import { Results } from 'src/app/models/results';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})

export class SearchFormComponent implements OnInit, OnDestroy {
  @Output() searchResults = new EventEmitter<Results>();
  @Output() searching = new EventEmitter<Boolean>();

  public searchForm!: FormGroup;
  private searchFormSubscription: Subscription = new Subscription;
  
  constructor(private searchService: SearchService) { 
    this.buildForm();
  }
  
  ngOnInit(): void {
    this.searchFormSubscription.add(this.searchForm.get('search')?.valueChanges
      .pipe(
        debounceTime(500),
        filter(query => query.length > 2),
        distinctUntilChanged())
      .subscribe(data=>this.foodSearch(data)))
    this.searchFormSubscription.add(this.searchForm.get('search')?.valueChanges
      .pipe(
        debounceTime(500),
        filter(query => query.length < 1),
        distinctUntilChanged())
      .subscribe(() => this.searching.emit(false)))
  }

  ngOnDestroy(): void {
    this.searchFormSubscription.unsubscribe();
  }

  public foodSearch(query: string): void {
    this.searchService.search(query).subscribe(result => this.searchResults.emit(result))
  }

  private buildForm(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }
}
