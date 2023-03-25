import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AppAuthService } from '@shared/services/auth-services/app-auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private appAuthService: AppAuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkUserLoggedIn();
  }

  private checkUserLoggedIn(): void {
    if (this.appAuthService.isLogin()) {
      this.router.navigate(['featured']);
    }
  }
}
