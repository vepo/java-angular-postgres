import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../model/user';
import { FormBuilder, Validators } from '@angular/forms';
import { MessagingService } from 'src/app/infra/message/messaging.service';
import { Level } from 'src/app/infra/message/level.enum';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  user: User = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    admin: false,
    enabled: true 
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<User>('/rest/user/me').subscribe(user => this.user = user);
  }

}
