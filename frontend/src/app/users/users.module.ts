import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserCreateComponent } from './user-create/user-create.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent,
    UserCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
  ]
})
export class UsersModule {}
