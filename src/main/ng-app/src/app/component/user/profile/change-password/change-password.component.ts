import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/infra/message/messaging.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { Level } from 'src/app/infra/message/level.enum';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.less']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm = this.formBuilder.group({
    password: ['', Validators.required],
    confirmation: ['', Validators.required]
  });


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private messaging: MessagingService) { }

  ngOnInit(): void {
  }

  changePassword(): void {
    this.http.post<User>('/rest/user/me/password', {
      password: this.passwordForm.controls.password.value
    }).subscribe(
      response => {
        this.messaging.add({ content: "Password atualizado com sucesso!", level: Level.INFO, timeout: 5 });
        this.router.navigate(['profile']);
      },
      error => this.messaging.add({ content: "Erro ao alterar password!", level: Level.ERROR, timeout: 5 }));
  }

  cancel(): void {
    this.router.navigate(['profile']);
  }

}
