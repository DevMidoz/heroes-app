import { Component } from '@angular/core';
import { MaterialModule } from '../../_modules/Material.Module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import { MatHint } from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, MatHint],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['Hero', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(AuthActions.login({ content: this.loginForm.value }));
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
