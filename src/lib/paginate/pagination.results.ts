export interface PaginationResults<T> {
  result: T[];
  total: number;
  next?: string;
  previous?: string;
}
