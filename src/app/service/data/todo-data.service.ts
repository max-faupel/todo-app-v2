import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from 'src/app/model/todo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private httpClient: HttpClient) { }

  retrieveAllTodos(username: string) {
    return this.httpClient.get<Todo[]>(`${environment.api_url}/users/${username}/todos`)
  }

  deleteTodo(username: string, id: number) {
    return this.httpClient.delete(`${environment.api_url}/users/${username}/todos/${id}`)
  }

  retrieveTodo(username: string, id: number) {
    return this.httpClient.get<Todo>(`${environment.api_url}/users/${username}/todos/${id}`)
  }

  createTodo(username: string, todo: Todo) {
    return this.httpClient.post<Todo>(`${environment.api_url}/users/${username}/todos`, todo)
  }

  updateTodo(username: string, id: number, todo: Todo) {
    return this.httpClient.put<Todo>(`${environment.api_url}/users/${username}/todos/${id}`, todo)
  }
}
