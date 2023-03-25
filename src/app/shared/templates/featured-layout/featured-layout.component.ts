import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-layout.component.html',
  styleUrls: ['./featured-layout.component.scss'],
})
export class FeaturedLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
