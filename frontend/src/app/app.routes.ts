import { Routes } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' }, // Redireciona para a listagem de usuários
  {
    path: 'users',
    children: [
      { path: '', component: UserListComponent }, // Rota para listar usuários
      { path: 'form', component: UserFormComponent }, // Rota para cadastrar/editar usuário
    ],
  },
];
