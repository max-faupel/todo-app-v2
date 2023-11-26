import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';
import { Todo } from 'src/app/model/todo.model';
import { TodoDataService } from 'src/app/service/data/todo-data.service';
import { JwtAuthenticationService } from 'src/app/service/jwt-authentication.service';

@Injectable()
export class TodoNestedResolver implements Resolve<Todo> {
  constructor(
    private todoDataService: TodoDataService,
    private authService: JwtAuthenticationService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Todo> | Promise<Todo> | Todo {
    let id = +route.params['id'];
    let user = this.authService.getAuthenticatedUser() || '';
    return this.todoDataService.retrieveTodo(user, id);
  }
}
