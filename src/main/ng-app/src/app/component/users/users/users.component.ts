import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageChangeEvent, PageChangeListener, TableComponent } from '../../base/table/table.component';
import { PaginatedResponse } from '../../../model/paginated.response';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {

  users: User[];

  @ViewChild(TableComponent) table: TableComponent<User>;

  filterForm = this.fb.group({
    enabled: [null],
    admin: [null]
  })

  constructor(private http: HttpClient, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe(filters => this.filterChagend());
  }

  toggleState(user: User) {
    this.http.post<User>(user.enabled ? `/rest/user/${user.id}/disable` : `/rest/user/${user.id}/enable`, {})
      .subscribe(toggledUser => {
        let index = this.users.findIndex(u => u.id == user.id);
        if (index >= 0) {
          this.users[index] = toggledUser;
        }
      });
  }

  private getParameters(limit: number, offset: number): HttpParams {
    let params = new HttpParams();
    params = params.append('limit', limit.toString());
    params = params.append('offset', offset.toString());
    ['enabled', 'admin'].forEach(key => {
      if (this.filterForm.value[key] != null) {
        params = params.append(key, this.filterForm.value[key])
      }
    });
    return params;
  }

  filterChagend() {
    this.http.get<PaginatedResponse<User>>('/rest/user', { params: this.getParameters(this.table.pageSize, 0) })
      .subscribe(response => {
        this.users = response.items;
        this.table.update(response.total, 0);
      });
  }

  pageChange(): PageChangeListener {
    return (event: PageChangeEvent) =>
      this.http.get<PaginatedResponse<User>>('/rest/user', { params: this.getParameters(event.limit, event.offset) })
        .subscribe(response => {
          this.users = response.items;
          this.table.update(response.total);
        });
  }

}
