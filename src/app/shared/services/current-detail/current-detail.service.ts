import {Injectable} from '@angular/core';
import {MenuInterface} from '@shared/interface/menu.interface';
import {CurrentDetailInterface} from '@shared/interface/current-detail.interface';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {
  CurrentUserInterface,
  Profile,
} from '@shared/interface/current-user.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrentDetailService {
  private current: CurrentDetailInterface | any = {};
  private currentMenu = new BehaviorSubject({});

  constructor() {
  }

  public assignUserDetail(userDetails: CurrentUserInterface) {
    Object.assign(this.current, {userDetails: userDetails});
  }

  public assignMenus(menus: Array<MenuInterface>) {
    Object.assign(this.current, {menus: menus});
  }

  public getUserDetail(): Profile {
    return this.current.userDetails;
  }

  public getAllMenus(): Array<MenuInterface> {
    return this.current.menus;
  }

  public setCurrentMenu(menu: MenuInterface | any) {
    this.currentMenu.next(menu);
  }

  public getCurrentMenu(): Observable<any> {
    return this.currentMenu.asObservable();
  }

  public setMenuByURL(URL: string) {
    this.currentMenu.next({});
    // this is exception case as this("/featured/organization-registration/view") has permission from
    // this route ("/featured/organization-registration/list")
    if (URL.includes('/featured/organization-registration/view/')) {
      URL = '/featured/organization-registration/list';
    }

    if (this.current.menus && this.current.menus.length > 0) {
      this.current.menus.forEach((el) => {
        if (URL.includes(el['menuLink'])) {
          if (el['children'] && el['children'].length > 0) {
            this.setChildMenuAsCurrentMenu(el['children'], URL);
          } else {
            this.setCurrentMenu(el);
          }
        }
      });
    }
  }

  public getMenuByUrl(URL: string): MenuInterface {
    let resultMenu: MenuInterface;
    if (this.current.menus && this.current.menus.length > 0) {
      this.current.menus.forEach((el) => {
        if (URL.includes(el['menuLink'])) {
          if (el['children'] && el['children'].length > 0) {
            resultMenu = this.getChildMenuAsCurrentMenu(el['children'], URL);
          } else {
            resultMenu = el;
          }
        }
      });
    }
    return resultMenu;
  }

  private setChildMenuAsCurrentMenu(menu: Array<MenuInterface>, URL: string): void {
    if (menu && menu.length > 0) {
      for (let item of menu) {
        if (URL.includes(item['menuLink'])) {
          if (item['children'] && item['children'].length > 0) {
            this.setChildMenuAsCurrentMenu(item['children'], URL);
          } else {
            this.setCurrentMenu(item);
          }
        }
      }
    }
  }

  private getChildMenuAsCurrentMenu(
    menu: MenuInterface,
    URL: string
  ): MenuInterface {
    let resultMenu: MenuInterface;
    if (menu['children'] && menu['children'].length > 0) {
      for (let item of menu['children']) {
        if (URL.includes(item['menuLink'])) {
          if (item['children'] && item['children'].length > 0) {
            this.getChildMenuAsCurrentMenu(item, URL);
          } else {
            resultMenu = item;
          }
        }
      }
    } else {
      resultMenu = menu;
    }
    return resultMenu;
  }
}
