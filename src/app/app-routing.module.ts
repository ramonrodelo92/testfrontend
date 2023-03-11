import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './core/components/navigation/navigation.component';

const routes: Routes = [
  {
    path: '/login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    component: NavigationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
