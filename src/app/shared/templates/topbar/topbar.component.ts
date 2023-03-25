import { Component, HostBinding, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Subject, takeUntil } from 'rxjs';
import { CurrentDetailService } from '@shared/services/current-detail/current-detail.service';
import { MenuInterface } from '@shared/interface/menu.interface';
import { LocalForeignTranslatePipe } from '@pipes/local-foreign-translate/local-foreign-translate.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, LocalForeignTranslatePipe, TranslateModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  @HostBinding('class') class = 'w-100';

  @Input() public headerTitle: string;

  private observableSubscriber = new Subject();

  public currentMenu!: MenuInterface;

  constructor(private currentDetailService: CurrentDetailService) {}
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
}
