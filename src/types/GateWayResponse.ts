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
  total_elements: number;
  total_pages: number;
  current_elements: number;
  current_page: number;
  order_by: string;
  sort_by: string;
  limit: number;
}
