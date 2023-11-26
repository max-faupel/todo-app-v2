import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { TodoComponent } from './todo/todo.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TodoGridComponent } from './todo-grid/todo-grid.component';
import { TodoNestedComponent } from './todo-grid/todo-nested/todo-nested.component';
import { TodoNestedResolver } from './service/data/todo-resolver.service';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'welcome/:name',
    component: WelcomeComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'todos',
    component: ListTodosComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'todoGrid',
    component: TodoGridComponent,
    canActivate: [RouteGuardService],
    children: [
      {
        path: ':id',
        component: TodoNestedComponent,
        canActivate: [RouteGuardService],
        resolve: {
          todo: TodoNestedResolver,
        },
      },
    ],
  },
  {
    path: 'todos/:id',
    component: TodoComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [RouteGuardService],
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
