import { Component } from '@angular/core';
import { Todo } from '../model/todo.model';
import { TodoDataService } from '../service/data/todo-data.service';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-grid',
  templateUrl: './todo-grid.component.html',
  styleUrls: ['./todo-grid.component.scss'],
})
export class TodoGridComponent {
  user: string = '';
  todos: Todo[] = [];

  constructor(
    private router: Router,
    private service: TodoDataService,
    private authService: JwtAuthenticationService
  ) {}

  ngOnInit() {
    this.user = this.authService.getAuthenticatedUser() || '';
    this.refreshTodos();
  }

  refreshTodos() {
    this.service.retrieveAllTodos(this.user).subscribe((response) => {
      console.log(response);
      this.todos = response;
    });
  }

  navigateTo(value: number) {
    this.router.navigate(['/todoGrid', value]);
  }
}
