import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Router } from '@angular/router';
import { MessagingService } from 'src/app/infra/message/messaging.service';
import { Level } from 'src/app/infra/message/level.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private authentication: AuthenticationService, private router: Router, private messaging: MessagingService) { }

  ngOnInit(): void {
    if (this.authentication.isAuthenticated()) {
      this.router.navigate(['todo'])
    }
  }

  login(): void {
    this.authentication.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
      .subscribe(
        auth => this.router.navigate(['todo']),
        error => {
          console.log(error);
          if (error.status == 401) {
            this.messaging.add({ content: "Não foi possível acessar. Usuário ou senha incorretos!", timeout: 5, level: Level.INFO });
          } else {
            this.messaging.add({ content: "Não foi possível acessar. Algo estranho aconteceu... ", timeout: 5, level: Level.ERROR });
          }
        });
  }

}
