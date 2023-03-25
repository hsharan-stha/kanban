import { Component, Input, OnInit } from '@angular/core';
import { CurrentDetailService } from '@shared/services/current-detail/current-detail.service';
import { map, Subject, takeUntil } from 'rxjs';
import { MenuInterface } from '@shared/interface/menu.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LocalForeignTranslatePipe } from '@shared/pipes/local-foreign-translate/local-foreign-translate.pipe';

@Component({
  selector: 'app-main-page-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, LocalForeignTranslatePipe],
  templateUrl: './main-page-header.component.html',
  styleUrls: ['./main-page-header.component.scss'],
})
export class MainPageHeaderComponent implements OnInit {
  @Input() public mainPageHeading!: string;

  public _currentDetailService: CurrentDetailService;
  public currentMenu!: MenuInterface;

  private observableSubscriber = new Subject();

  constructor(private currentDetailService: CurrentDetailService) {
    this._currentDetailService = currentDetailService;
  }

  ngOnInit(): void {
    this.currentDetailService
      .getCurrentMenu()
      .pipe(
        takeUntil(this.observableSubscriber),
        map((res) => {
          this.currentMenu = res;
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.observableSubscriber.next(undefined);
    this.observableSubscriber.complete();
  }

  public toggled(): void {
    setTimeout(() => {
      const menuToggle: any = document.querySelector('#main-body');
      if (menuToggle) {
        menuToggle.classList.toggle('toggled');
      }
    }, 0);
  }
}
