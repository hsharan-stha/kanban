import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '@environment/environment';
import {catchError, forkJoin, map, of} from 'rxjs';
import {AppAuthService} from '../auth-services/app-auth.service';
import {CurrentDetailService} from '../current-detail/current-detail.service';
import {menuItems} from "@constant/menu";

@Injectable({
  providedIn: 'root',
})
export class InitializerService {
  private userDetailUrl = `${environment.BASE_URL}user/user-info`;
  private menusDetailUrl = `${environment.BASE_URL}role-menu-permissions`;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private appAuthService: AppAuthService,
    private currentDetailService: CurrentDetailService
  ) {
  }

  public initializer(): Promise<any> {

    this.currentDetailService.assignMenus(menuItems['data']);

    if (!this.appAuthService.isLogin()) return of(false).toPromise();
    return forkJoin([
      this.httpClient
        .get(`${this.userDetailUrl}`)
        .pipe(map((res: any) => res['data'])),
    ])
      .pipe(
        map((res) => {
          this.currentDetailService.assignUserDetail(res[0]);
          this.currentDetailService.assignMenus(res[0]['menus']);
          return res;
        }),
        catchError((err) => {
          this.router.navigateByUrl('/auth');
          return of(err);
        })
      )
      .toPromise();
  }
}
