import { Component, inject, signal } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    TuiIcon
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  authService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal(false);

  form = new FormGroup<{
    username: FormControl<string | null>;
    password: FormControl<string | null>;
  }>({
    username: new FormControl<string | null>(
      null,
      [Validators.required]
    ),
    password: new FormControl<string | null>(
      null,
      [Validators.required]
    )
  })

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (this.form.valid) {
      this.authService.login(this.form.getRawValue())
        .subscribe({
          next: (response) => {
            this.router.navigate(['/']);

            console.log('Login successful', response);
            // Handle successful login (e.g., save token, redirect)
          },
          error: (error) => {
            console.error('Login failed', error);
            // Handle login error
          }
        });
    }
  }
}
