import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Pagination } from '../model/pagination.model';
import { Todo } from '../model/todo.model';
import { TodoDataService } from '../service/data/todo-data.service';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';
import { saveTodoPagination } from '../state/pagination.actions';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.scss'],
})
export class ListTodosComponent implements OnInit {
  todosFilterForm = new FormGroup({
    done: new FormControl(),
  });

  displayedColumns: string[] = [
    'id',
    'description',
    'done',
    'targetDate',
    'actions',
  ];
  dataSource: MatTableDataSource<Todo>;
  todos: Todo[] = [];
  message: string = '';
  user: string = '';
  pagination$!: Observable<Pagination>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: TodoDataService,
    private router: Router,
    private authService: JwtAuthenticationService,
    private store: Store<{ pagination: Pagination }>
  ) {
    this.dataSource = new MatTableDataSource(this.todos);
    this.pagination$ = this.store.select('pagination');
  }

  ngOnInit(): void {
    this.user = this.authService.getAuthenticatedUser() || '';
    this.refreshTodos();
    this.dataSource.filterPredicate = (data: Todo, filter: string) => {
      let filterTodo: Todo = JSON.parse(filter);

      if (filterTodo.done) {
        if (data.done === filterTodo.done) {
          return true;
        }
      } else {
        return true;
      }

      return false;
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    setTimeout(() => {
      this.pagination$.pipe(take(1)).subscribe((pagination) => {
        console.log(
          `Restore pagination! pageSize: ${pagination.pageSize}, pageIndex: ${pagination.pageIndex}`
        );
        this.paginator.pageSize = pagination.pageSize;
        this.paginator.pageIndex = pagination.pageIndex;
      });
    });
  }

  onPaginationChange(event: PageEvent) {
    let pagination = new Pagination(event.pageSize, event.pageIndex);
    console.log(
      `Save pagination! pageSize: ${pagination.pageSize}, pageIndex: ${pagination.pageIndex}`
    );
    this.store.dispatch(saveTodoPagination({ pagination }));
  }

  filterTodos() {
    this.dataSource.filter = JSON.stringify(this.todosFilterForm.value);
    console.log(`Filter: ${this.dataSource.filter}`);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshTodos() {
    this.service.retrieveAllTodos(this.user).subscribe((response) => {
      console.log(response);
      this.todos = response;
      this.dataSource.data = this.todos;
    });
  }

  deleteTodo(id: number) {
    console.log(`delete todo ${id}`);
    this.service.deleteTodo(this.user, id).subscribe((response) => {
      console.log(response);
      this.message = `Delete of todo ${id} successful"!`;
      this.refreshTodos();
    });
  }

  updateTodo(id: number) {
    console.log(`update todo ${id}`);
    this.router.navigate(['todos', id]);
  }

  addTodo() {
    console.log('add todo');
    this.router.navigate(['todos', -1]);
  }
}
