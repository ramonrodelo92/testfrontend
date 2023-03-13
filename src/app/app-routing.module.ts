import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './core/components/navigation/navigation.component';
import { AuthGuard } from './core/guards/auth.guard';
import { IsLoggedInGuard } from './core/guards/is-logged-in.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [IsLoggedInGuard],
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    component: NavigationComponent,
    title: 'Home',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'policy', pathMatch: 'full' },
      {
        path: 'policy',
        loadChildren: () =>
          import('./pages/policy/policy.module').then((m) => m.PolicyModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
