import { HttpClient } from '@angular/common/http'; 
import { TodoCardComponent } from './../todo-card/todo-card.component';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetToDoListResponse } from '../../models/getToDoListResponse';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, TodoCardComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  todoList: string[] = [];
  newTodo: string = '';
  toDoListFromBackend: GetToDoListResponse[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchTodos();
  }

  add(): void {
    const newTodoItem: GetToDoListResponse = {
      userId: 1,
      id: this.toDoListFromBackend.length + 1,
      title: this.newTodo,
      completed: false
    };

    if (this.newTodo.trim().length > 0) {
      this.httpClient
        .post<GetToDoListResponse>('https://jsonplaceholder.typicode.com/todos', newTodoItem)
        .subscribe({
          next: (response: GetToDoListResponse) => {
            this.toDoListFromBackend.push(response);
            this.newTodo = '';
          },
          error: (err: any) => {
            console.log('Ekleme sırasında hata oluştu', err);
          }
        });
    }
  }

  remove(todo: GetToDoListResponse) {
    this.httpClient
      .delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
      .subscribe({
        next: () => {
          this.toDoListFromBackend = this.toDoListFromBackend.filter(
            (i) => i.id !== todo.id
          );
        },
        error: (err: any) => {
          console.log('Silme sırasında hata oluştu', err);
        }
      });
  }

  fetchTodos() {
    // Async, Observable, Subscribe
    this.httpClient
      .get<GetToDoListResponse[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe({
        next: (response: GetToDoListResponse[]) => {
          this.toDoListFromBackend = response;
        },
        error: (err: any) => {
          console.log('HATA', err);
        },
        complete: () => {
          console.log('istek başarılı bitti');
        },
      });
    // RxJs observable
  }
}
