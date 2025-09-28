import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  }
];
