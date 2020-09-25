import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { TodoComponent } from './component/todo/todo.component';
import { UsersComponent } from './component/users/users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JwtInterceptor } from './infra/jwt.interceptor';
import { HeaderComponent } from './component/base/header/header.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { ProfileComponent } from './component/user/profile/profile.component';

import { MessagingService } from './infra/message/messaging.service';
import { MessagePanelComponent } from './component/base/messages/message-panel/message-panel.component';
import { EditProfileComponent } from './component/user/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './component/user/profile/change-password/change-password.component';
import { EditUserComponent } from './component/users/edit-user/edit-user.component';
import { TableComponent } from './component/base/table/table.component';
import { ViewUserComponent } from './component/users/view-user/view-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoComponent,
    UsersComponent,
    HeaderComponent,
    ProfileComponent,
    MessagePanelComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    EditUserComponent,
    TableComponent,
    ViewUserComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ClickOutsideModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    MessagingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
