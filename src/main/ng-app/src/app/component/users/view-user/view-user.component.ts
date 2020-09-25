import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.less']
})
export class ViewUserComponent implements OnInit {

  user: User = {
    id: -1,
    username: '',
    firstName: '',
    lastName: '',
    enabled: false,
    email: '',
    admin: false
  };

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>
      this.http.get<User>(`/rest/user/${params.id}`)
        .subscribe(user => this.user = user));
  }

  back(): void {
    this.router.navigate(['users']);
  }

}
