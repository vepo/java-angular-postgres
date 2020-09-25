import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { TodoComponent } from './component/todo/todo.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { UsersComponent } from './component/users/users/users.component';
import { RoleGuardService } from './auth/role-guard.service';
import { ProfileComponent } from './component/user/profile/profile.component';
import { EditProfileComponent } from './component/user/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './component/user/profile/change-password/change-password.component';
import { EditUserComponent } from './component/users/edit-user/edit-user.component';
import { ViewUserComponent } from './component/users/view-user/view-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'todo', component: TodoComponent, canActivate: [AuthGuardService] },
  { path: 'users', component: UsersComponent, canActivate: [RoleGuardService], data: { expectedRole: 'ADMIN' } },
  { path: 'users/new', component: EditUserComponent, canActivate: [RoleGuardService], data: { expectedRole: 'ADMIN' } },
  { path: 'users/:id', component: ViewUserComponent, canActivate: [RoleGuardService], data: { expectedRole: 'ADMIN' } },
  { path: 'users/:id/edit', component: EditUserComponent, canActivate: [RoleGuardService], data: { expectedRole: 'ADMIN' } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'profile/edit', component: EditProfileComponent, canActivate: [AuthGuardService] },
  { path: 'profile/password/edit', component: ChangePasswordComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
