import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MessagingService } from 'src/app/infra/message/messaging.service';
import { Level } from 'src/app/infra/message/level.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.less']
})
export class EditProfileComponent implements OnInit {

  public user: User = {
    id: 0,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    admin: false,
    enabled: true
  };

  profileForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15), Validators.pattern(/^[a-zA-z0-9\-_]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private messaging: MessagingService) { }

  ngOnInit(): void {
    this.http.get<User>('/rest/user/me').subscribe(user => {
      this.user = user;
      this.profileForm.setValue({
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      });
    });
  }

  get profileForms() {
    return this.profileForm.controls;
  }

  save(): void {
    this.http.post<User>('/rest/user/me', this.profileForm.value)
      .subscribe(
        user => {
          this.messaging.add({ content: "Usuário atualizado!", level: Level.INFO, timeout: 5 });
          this.router.navigate(['profile']);
        },
        error => this.messaging.add({ content: "Erro ao atualizar Usuário!", level: Level.ERROR, timeout: 5 }));
  }

  cancel(): void {
    this.router.navigate(['profile']);
  }


}
