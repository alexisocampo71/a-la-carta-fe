import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ToolbarComponent } from './common/toolbar/toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchFormComponent } from './components/main/search-form/search-form.component';
import { DishComponent } from './common/dish/dish.component';
import { SearchComponent } from './components/main/search/search.component';
import { MenuDishesComponent } from './components/main/menu-dishes/menu-dishes.component';
import { DishDetailComponent } from './components/dish-detail/dish-detail.component';
import { TotalsComponent } from './components/main/totals/totals.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ToolbarComponent,
    SearchFormComponent,
    DishComponent,
    SearchComponent,
    MenuDishesComponent,
    DishDetailComponent,
    TotalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
