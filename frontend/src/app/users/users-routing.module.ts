import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: 'register', component: UserRegistrationComponent, canActivate: [AuthGuard] },
  { path: '', component: UserListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
