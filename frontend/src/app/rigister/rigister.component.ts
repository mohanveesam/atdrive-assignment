import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-rigister',
  imports: [SharedModule],
  templateUrl: './rigister.component.html',
  styleUrl: './rigister.component.css'
})
export class RigisterComponent {
    registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.registerForm  = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
    { validators: this.passwordMatchValidator });
  }
  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }
  register() {
    if (this.registerForm.invalid) return;
    const { username, password, confirmPassword } = this.registerForm.value;
    this.auth.register(this.registerForm.value).subscribe({
      next: () => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error: err => {
        alert(err.error?.message || 'Registration failed');
      }
    });
  }
}
