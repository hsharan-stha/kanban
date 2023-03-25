import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {map, Observable, take} from 'rxjs';
import {CurrentDetailService} from '@shared/services/current-detail/current-detail.service';
import {AlertifyService} from '@shared/services/alertifyjs/alertify.service';
import {TranslateService} from '@ngx-translate/core';
import {Permission} from '@shared/enums/permission.enum';

@Injectable({
  providedIn: 'root',
})
export class CanActivateChildGuard implements CanActivateChild {
  public excludedUrl = [
    '/featured/dashboard',
    '/featured/profile'
  ];

  constructor(
    private alertifyService: AlertifyService,
    private router: Router,
    private translateService: TranslateService,
    private currentDetailService: CurrentDetailService
  ) {
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.currentDetailService.setMenuByURL(state.url);

    return this.currentDetailService.getCurrentMenu().pipe(
      take(1),
      map((res) => {

        return true;

        let result = res['permissions']?.[Permission.READ] ||
          this.excludedUrl.some((i) => state.url.includes(i));

        // create permission
        if (state.url.includes('/create')) {
          result = res['permissions']?.[Permission.CREATE];
        }
        // update permission
        else if (state.url.includes('/edit')) {
          result = res['permissions']?.[Permission.UPDATE];
        }
        // delete permission
        else if (state.url.includes('/delete')) {
          result = res['permissions']?.[Permission.DELETE];
        }
        // reviewer permission
        else if (state.url.includes('/review')) {
          result = res['permissions']?.[Permission.REVIEW];
        }
        // approve permission
        else if (state.url.includes('approve')) {
          result = res['permissions']?.[Permission.APPROVE];
        }

        if (!result) {
          this.router.navigate(['/']);
          this.alertifyService.error(this.translateService.instant('Not allow to access'));
        }
        return result;
      })
    );
  }
}
