import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: UserFormComponent
  },
  {
    path: 'edit/:id',
    component: UserFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
