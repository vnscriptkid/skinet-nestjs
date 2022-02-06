import { Expose } from 'class-transformer';

export class PaginatedResult<T> {
  @Expose()
  data: T[];

  @Expose()
  count: number;

  @Expose()
  pageIndex: number;

  @Expose()
  pageSize: number;

  constructor(data: T[], count: number, pageIndex: number, pageSize: number) {
    this.data = data;
    this.count = count;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
  }
}
