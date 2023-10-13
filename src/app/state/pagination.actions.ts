import { createAction, props } from '@ngrx/store';
import { Pagination } from '../model/pagination.model';

export const saveTodoPagination = createAction(
  '[Todo] Save pagination',
  props<{ pagination: Pagination }>()
);
