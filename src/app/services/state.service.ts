import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, Subject } from 'rxjs';
import { MenuTotals } from '../models/menu-totals';

export interface UserToken {
  token: String
}

@Injectable({
  providedIn: 'root'
})

export class StateService {

  private userSubject: ReplaySubject<Boolean> = new ReplaySubject<Boolean>();
  public isLoggedIn$: Observable<Boolean>;

  public menuDishes: ReplaySubject<Array<Object>> = new ReplaySubject();
  public menuTotals: Subject<MenuTotals> = new Subject();

  constructor() { 
    const user = this.getUserInfo();
    if (user.token) {
      this.userSubject.next(!!user.token)
    }
    this.isLoggedIn$ = this.userSubject.pipe(map(user => !!user));
  }

  private getUserInfo(): UserToken {
    return JSON.parse(localStorage.getItem('userInfo') || '{}')
  }

  public setUser(user: String): void {
    this.userSubject.next(!!user)
  }
}
