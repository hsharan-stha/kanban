import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {Router, RouterModule} from '@angular/router';
import {LocalStorageService} from '@shared/services/local-storage/local-storage.service';
import {LocalForeignTranslatePipe} from '@shared/pipes/local-foreign-translate/local-foreign-translate.pipe';
import {CurrentDetailService} from '@shared/services/current-detail/current-detail.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    LocalForeignTranslatePipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public allMenus: Array<any>;
  public userDetail: any;

  @Output() public onSideBarCLickEvent = new EventEmitter<any>();
  @Output() toggle = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService,
    private currentDetailService: CurrentDetailService
  ) {
  }

  ngOnInit(): void {
    this.userDetail = this.currentDetailService.getUserDetail();
    this.allMenus = this.currentDetailService.getAllMenus();
    console.log(this.allMenus);
    debugger
  }

  public onSideBarCLick(menu: any): void {
    this.onSideBarCLickEvent.emit(menu);
  }

  public toggled(): void {
    this.toggle.emit(true);
  }

  public logOut(): void {
    this.localStorageService.clearStorage();
    this.router.navigate(['auth']);
  }

  public useLanguage(lang: string): void {
    this.translateService.use(lang);
    this.localStorageService.setLanguageKey(lang);
  }

  public searchMenuItems(event: any) {
    let value = event.target.value;
    if (!value || value.length == 0) {
      this.allMenus = this.currentDetailService.getAllMenus();
    } else {
      this.allMenus = this.currentDetailService.getAllMenus().filter(i => {
        return i?.['menuName']?.toUpperCase().includes(value.toUpperCase())
      })
    }
  }
}
