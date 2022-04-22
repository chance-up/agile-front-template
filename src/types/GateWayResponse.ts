export interface GateWayResponse<T> {
  common: Common;
  data: Data<T>;
}
export interface Common {
  code: number;
  message: string;
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
