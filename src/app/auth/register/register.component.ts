import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../_modules/Material.Module';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      powers: ['', Validators.required],
      description: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['Hero'], // hidden field, always 'Hero'
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.store.dispatch(
        AuthActions.register({ content: this.registerForm.value })
      );
    }
  }
}
