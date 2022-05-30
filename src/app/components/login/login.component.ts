import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { StateService } from 'src/app/services/state.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  public loginForm!: FormGroup;
  public loading: Boolean = false
  public globalState: Boolean = false
  private authServiceSubscription = new Subscription();
  private isLoggedInSubscription = new Subscription();

  constructor(private authService: AuthService, private router: Router, private state: StateService) {
    this.buildForm();
    this.isLoggedInSubscription = this.state.isLoggedIn$.subscribe((value) => {
      this.globalState = value
    })
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
    this.isLoggedInSubscription.unsubscribe();
  }

  public getErrorMessage(): String {
    if (this.loginForm.get('email')?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return this.loginForm.get('email')?.hasError('email') ? 'Debes ingresar un email válido' : '';
  }

  public handleSubmit(event: Event): void {
    event.preventDefault();
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const value = this.loginForm.value;
    this.authServiceSubscription = this.authService.logIn(JSON.stringify(value))
    .subscribe({
      next: (data) => {
        this.authService.setUserInfo(data)
        this.loading = false
        this.router.navigate(['/'])
      },
      error: (e) => {
        this.loading = false
        this.alert();
      }
    })
  }

  private buildForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  private alert(): void {
    Swal.fire({
      icon: "error",
      title: 'Oops...',
      text: 'Algo salió mal, inténtalo de nuevo!'
    });
  }
}
