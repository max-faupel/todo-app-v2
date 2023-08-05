import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.scss']
})
export class ListTodosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description', 'done', 'targetDate', 'actions'];
  todos: Todo[] = []
  message: string = ''
  user: string = '';

  constructor(
    private service: TodoDataService,
    private router: Router,
    private authService: JwtAuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authService.getAuthenticatedUser() || ''
    this.refreshTodos()
  }
  refreshTodos() {
    this.service.retrieveAllTodos(this.user).subscribe(
      response => {
        console.log(response)
        this.todos = response
      }
    )
  }

  deleteTodo(id: number) {
    console.log(`delete todo ${id}`)
    this.service.deleteTodo(this.user, id).subscribe(
      response => {
        console.log(response)
        this.message = `Delete of todo ${id} successful"!`
        this.refreshTodos()
      }
    )
  }

  updateTodo(id: number) {
    console.log(`update todo ${id}`)
    this.router.navigate(['todos', id])
  }

  addTodo() {
    console.log("add todo")
    this.router.navigate(['todos', -1])
  }
}
