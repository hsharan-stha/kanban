import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-hide-password',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-hide-password.component.html',
  styleUrls: ['./show-hide-password.component.scss'],
})
export class ShowHidePasswordComponent implements OnInit {
  @Input() htmlInput: any;
  public showPassword: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  toggleShow() {
    this.showPassword = !this.showPassword;
    this.htmlInput.type = this.showPassword ? 'text' : 'password';
  }
}
