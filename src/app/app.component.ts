import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Kanban';

  constructor(private translate: TranslateService) {
    if (localStorage.getItem('lang')) {
      translate.use(localStorage.getItem('lang'));
    } else {
      localStorage.setItem('lang', 'en');
      translate.use('en');
    }
  }

  ngOnInit(): void {
  }
}
