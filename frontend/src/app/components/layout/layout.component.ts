import { Component} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  constructor(
    private router: Router,
    private auth: AuthService,
    private dialog: MatDialog
  ) {}

  logout() {
   this.auth.logout();
    this.router.navigate(['login']);
  }
  
}
