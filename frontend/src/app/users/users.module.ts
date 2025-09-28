import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    UserRegistrationComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule // ← ESSENCIAL para template-driven forms
  ]
})
export class UsersModule { }
