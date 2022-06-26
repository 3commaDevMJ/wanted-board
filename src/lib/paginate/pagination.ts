import { PaginationResults } from './pagination.results';

export class Pagination<T> {
  public results: T[];
  public pageTotal: number;
  public total: number;

  constructor(paginationResult: PaginationResults<T>) {
    this.results = paginationResult.result;
    this.pageTotal = paginationResult.result.length;
    this.total = paginationResult.total;
  }
}
