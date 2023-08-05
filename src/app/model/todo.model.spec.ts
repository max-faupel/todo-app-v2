import { Todo } from './todo.model';

describe('Todo', () => {
  it('should create an instance', () => {
    expect(new Todo('', false, new Date())).toBeTruthy();
  });
});
