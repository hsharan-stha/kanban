import {AfterViewInit, Component, OnInit,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FeaturedLayoutComponent} from '@shared/templates/featured-layout/featured-layout.component';
import {TopbarComponent} from '@shared/templates/topbar/topbar.component';
import {SidebarComponent} from '@shared/templates/sidebar/sidebar.component';
import {CurrentDetailService} from '@shared/services/current-detail/current-detail.service';

@Component({
  selector: 'app-featured',
  standalone: true,
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    FeaturedLayoutComponent,
    TopbarComponent,
    SidebarComponent,
  ],
})
export class FeaturedComponent implements OnInit, AfterViewInit {


  constructor(
    private currentDetailService: CurrentDetailService
  ) {
  }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
  }


  public toggled(): void {
  }

  public onSideBarClickEvent(menu: any) {
    this.currentDetailService.setCurrentMenu(menu);
  }


}
