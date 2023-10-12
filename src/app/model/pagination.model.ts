export class Pagination {
  pageSize: number;
  pageIndex: number;

  constructor(pageSize: number = 5, pageIndex: number = 0) {
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
  }
}
