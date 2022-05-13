export interface GateWayResponse<T> {
  status: number;
  data: Data<T>;
}
export interface Data<T> {
  pagination?: Pagination;
  value: T;
}

export interface Pagination {
  page: number;
  size: number;
  totalElements: number;
  totalPage: number;
  currentElements: number;
  currentPage: number;
  orderBy: string;
  sortBy: string;
  limit: number;
}
