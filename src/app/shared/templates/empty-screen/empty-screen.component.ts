import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-empty-screen',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './empty-screen.component.html',
  styleUrls: ['./empty-screen.component.scss'],
})
export class EmptyScreenComponent implements OnInit {
  @Input() emptyDetail: { title: string; desc: string } = {
    title: '',
    desc: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
