import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/model/todo.model';
import { TodoDataService } from 'src/app/service/data/todo-data.service';
import { JwtAuthenticationService } from 'src/app/service/jwt-authentication.service';

@Component({
  selector: 'app-todo-nested',
  templateUrl: './todo-nested.component.html',
  styleUrls: ['./todo-nested.component.scss'],
})
export class TodoNestedComponent implements OnInit {
  todoForm = new FormGroup({
    id: new FormControl(-1),
    username: new FormControl(''),
    description: new FormControl('', Validators.required),
    done: new FormControl(),
    targetDate: new FormControl(),
  });

  id: number = -1;
  user: string = '';

  constructor(
    private service: TodoDataService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: JwtAuthenticationService
  ) {}

  ngOnInit(): void {
    // this.id = +this.route.snapshot.params['id'];
    // console.log(`Init todo ${this.id}`);
    // this.user = this.authService.getAuthenticatedUser() || '';
    // if (this.id != -1) {
    //   this.service.retrieveTodo(this.user, this.id).subscribe((response) => {
    //     console.log(`Retrieved todo: ${JSON.stringify(response)}`);
    //     this.id = response.id;
    //     this.todoForm.setValue(response);
    //   });
    // }
    this.route.data.subscribe(({ todo }) => {
      this.todoForm.setValue(todo);
    });
  }

  saveTodo() {
    let todo = new Todo(
      this.todoForm.value.description || '',
      this.todoForm.value.done || false,
      this.todoForm.value.targetDate
    );

    if (this.id === -1) {
      console.log(`Creating todo: ${JSON.stringify(todo)}`);
      this.service.createTodo(this.user, todo).subscribe((response) => {
        console.log(response);
        this.router.navigate(['todos']);
      });
    } else {
      console.log(`Updating todo: ${JSON.stringify(todo)}`);
      this.service
        .updateTodo(this.user, this.id, todo)
        .subscribe((response) => {
          console.log(response);
          this.router.navigate(['todos']);
        });
    }
  }
}
