import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../../../infra/custom-validators';
import { MessagingService } from 'src/app/infra/message/messaging.service';
import { Level } from 'src/app/infra/message/level.enum';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.less']
})
export class EditUserComponent implements OnInit {
  user: User;

  userForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15), Validators.pattern(/^[a-zA-z0-9\-_]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    admin: [''],
    generatePassword: [''],
    password: [''],
    confirmation: ['', CustomValidators.confirmation('password', () => this.userForm)]
  });


  constructor(private formBuilder: FormBuilder, private router: Router, private activeRoute: ActivatedRoute, private http: HttpClient, private messaging: MessagingService) {
    activeRoute.params.subscribe(params => {
      if (params.id) {
        this.http.get<User>(`/rest/user/${params.id}`).subscribe(user => {
          this.user = user;
          this.userForm.setValue({
            username: this.user.username,
            email: this.user.email,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            admin: this.user.admin,
            generatePassword: false,
            password: '',
            confirmation: ''
          })
        });
      } else {
        this.user = {
          id: -1,
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          admin: false,
          enabled: true
        };
        this.userForm.setValue({
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          admin: false,
          generatePassword: true,
          password: '',
          confirmation: ''
        })
      }
    });
  }

  ngOnInit(): void {
  }

  get userForms() {
    return this.userForm.controls;
  }

  generatePassword(): boolean {
    return !this.userForm.controls.generatePassword.value;
  }

  editMode(): boolean {
    return this.user && this.user.id != -1;
  }

  save(): void {
    if (this.editMode()) {
      this.http.post<User>(`/rest/user/${this.user.id}`, {
        username: this.userForm.controls.username.value,
        email: this.userForm.controls.email.value,
        firstName: this.userForm.controls.firstName.value,
        lastName: this.userForm.controls.lastName.value,
        admin: this.userForm.controls.admin.value
      }).subscribe(
        user => {
          this.messaging.add({
            content: `Usuário ${user.firstName} ${user.lastName} alterado com sucesso!`,
            level: Level.INFO,
            timeout: 5
          });
          this.router.navigate(['users']);
        },
        error => this.messaging.add({
          content: `Erro ao salvar alterações!`,
          level: Level.ERROR,
          timeout: 5
        }))
    } else {
      this.http.post<User>('/rest/user/', {
        username: this.userForm.controls.username.value,
        email: this.userForm.controls.email.value,
        firstName: this.userForm.controls.firstName.value,
        lastName: this.userForm.controls.lastName.value,
        admin: this.userForm.controls.admin.value,
        generatePassword: this.userForm.controls.generatePassword.value,
        password: this.userForm.controls.password.value
      }).subscribe(
        user => {
          this.messaging.add({
            content: `Usuário ${user.firstName} ${user.lastName} criado com sucesso!`,
            level: Level.INFO,
            timeout: 5
          });
          this.router.navigate(['users']);
        },
        error => this.messaging.add({
          content: `Erro ao criar usuário!`,
          level: Level.ERROR,
          timeout: 5
        }))
    }
  }

  cancel(): void {
    this.router.navigate(['users']);
  }

}
