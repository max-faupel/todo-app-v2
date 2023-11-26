import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoNestedComponent } from './todo-nested.component';

describe('TodoComponent', () => {
  let component: TodoNestedComponent;
  let fixture: ComponentFixture<TodoNestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoNestedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoNestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
