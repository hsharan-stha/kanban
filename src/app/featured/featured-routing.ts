import {Routes} from '@angular/router';
import {FeaturedComponent} from "@featured/featured/featured.component";
import {CanActivateChildGuard} from "@guards/can-activate-child/can-activate-child.guard";

export const featuredRoutes: Routes = [
  {
    path: '',
    component: FeaturedComponent,
    canActivateChild: [CanActivateChildGuard],
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      }
    ]
  }
];
