import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';
import { Todo } from '../model/todo.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { filter } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.scss']
})
export class ListTodosComponent implements OnInit {
  todosFilterForm = new FormGroup({
    done: new FormControl()
  })


  displayedColumns: string[] = ['id', 'description', 'done', 'targetDate', 'actions'];
  dataSource: MatTableDataSource<Todo>;
  todos: Todo[] = []
  message: string = ''
  user: string = '';


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: TodoDataService,
    private router: Router,
    private authService: JwtAuthenticationService) {
    this.dataSource = new MatTableDataSource(this.todos);
  }

  ngOnInit(): void {
    this.user = this.authService.getAuthenticatedUser() || ''
    this.refreshTodos()
    this.dataSource.filterPredicate = (data: Todo, filter: string) => {
      let filterTodo: Todo = JSON.parse(filter)

      if (filterTodo.done) {
        if (data.done === filterTodo.done) {
          return true
        }
      } else {
        return true
      }

      return false
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterTodos() {
    this.dataSource.filter = JSON.stringify(this.todosFilterForm.value);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshTodos() {
    this.service.retrieveAllTodos(this.user).subscribe(
      response => {
        console.log(response)
        this.todos = response
        this.dataSource.data = this.todos;
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
