import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

   login() {
    this.auth.login(this.loginForm.value).subscribe((res: any) => {
      // this.auth.saveToken(res.token);
       this.auth.saveAuthData(
      res.token,
      res.id,          // 🔥 STORE USER ID
    );
      this.router.navigate(['/components/dashboard']);
    });
  }

}
