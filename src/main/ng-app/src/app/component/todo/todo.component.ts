import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Todo } from '../../model/todo';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less']
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];

  todoForm = this.formBuilder.group({
    title: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  add() {
    this.todos.push({
      title: this.todoForm.controls['title'].value,
      content: ''
    });
    this.todoForm.controls['title'].setValue('');
    this.todoForm.controls['title'].markAsPristine();
  }

}
