import { createReducer, on } from '@ngrx/store';
import { saveTodoPagination } from './pagination.actions';

export interface State {
  pageSize: number;
  pageIndex: number;
}
export const initialState: State = {
  pageSize: 5,
  pageIndex: 0,
};

export const paginationReducer = createReducer(
  initialState,
  on(saveTodoPagination, (state, { pagination }) => ({
    ...state,
    pageSize: pagination.pageSize,
    pageIndex: pagination.pageIndex,
  }))
);
