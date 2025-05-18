import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class AuthComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginError = '';
  registerError = '';

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  login() {
    const { email, password } = this.loginForm.value;
    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => this.router.navigate(['/']))
      .catch(err => this.loginError = err.message);
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerError = this.passwordMismatch ? 'A jelszavak nem egyeznek!' : 'Hiányzó vagy hibás adatok!';
      return;
    }
    const { email, password } = this.registerForm.value;
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => this.router.navigate(['/']))
      .catch(err => this.registerError = err.message);
  }

  get passwordMismatch(): boolean {
    return this.registerForm.errors?.['passwordMismatch'] ?? false;
  }

  private passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { passwordMismatch: true };
  }
}
