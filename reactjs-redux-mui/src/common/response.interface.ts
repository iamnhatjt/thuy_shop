interface IPagination {
  pageNum: number;
  pageSize: number;
  totalCount: number;
}

export interface IResponse<T> {
  data: T;
  code: string;
}

export interface IResponsePagination<T> extends IResponse<T> {
  pagination: IPagination;
}
