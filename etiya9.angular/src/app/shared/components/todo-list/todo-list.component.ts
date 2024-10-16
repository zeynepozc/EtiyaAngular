import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  todoList: string[] = [];
  newTodo: string = '';

  addNewTodo() {
    if (this.newTodo.trim() && !this.todoList.includes(this.newTodo.trim())) {
      this.todoList.push(this.newTodo.trim());
      this.newTodo = ''; 
    }
  }

  removeTodo(index: number) {
    this.todoList.splice(index, 1);
  }
}
