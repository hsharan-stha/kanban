import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CanActivateGuard} from '@guards/can-activate/can-activate.guard';
import {AuthComponent} from './auth/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'featured',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./auth/auth-routing').then((r) => r.authRoutes),
  },
  {
    path: 'featured',
    canActivate: [CanActivateGuard],
    loadChildren: () =>
      import('./featured/featured-routing').then((r) => r.featuredRoutes),
  },
  {
    path: '**',
    redirectTo: 'featured/dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
