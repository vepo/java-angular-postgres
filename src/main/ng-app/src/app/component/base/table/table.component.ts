import { Component, OnInit, Input } from '@angular/core';

export interface PageChangeEvent {
  offset: number;
  limit: number;
}

export interface PageChangeListener {
  (event: PageChangeEvent): void
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent<T> implements OnInit {

  @Input()
  pageChange: PageChangeListener;

  @Input()
  pageSize: number = 10;

  total: number = 0;

  numberOfPages: number = 0

  offset: number = 0;

  constructor() { }

  update(total: number, offet?: number): void {
    this.total = total;
    if (offet != undefined) {
      this.offset = offet;
    }
    this.numberOfPages = Math.ceil(this.total / this.pageSize);
  }

  ngOnInit(): void {
    this.pageChange({
      limit: this.pageSize,
      offset: this.offset
    });
  }

  get firstDisabled(): boolean {
    return this.offset == 0;
  }

  get previousDisabled(): boolean {
    return this.offset < this.pageSize;
  }

  get nextDisabled(): boolean {
    return this.offset + this.pageSize >= this.total;
  }

  get lastDisabled(): boolean {
    return this.offset + this.pageSize >= this.total;
  }

  get currentPage(): number {
    return 1 + Math.ceil(this.offset / this.pageSize);
  }

  first(): void {
    this.offset = 0;
    this.pageChange({
      limit: this.pageSize,
      offset: this.offset
    });
  }

  previous(): void {
    this.offset -= this.pageSize;
    this.pageChange({
      limit: this.pageSize,
      offset: this.offset
    });
  }

  next(): void {
    this.offset += this.pageSize;
    this.pageChange({
      limit: this.pageSize,
      offset: this.offset
    });
  }

  last(): void {
    this.offset = (this.numberOfPages - 1) * this.pageSize;
    this.pageChange({
      limit: this.pageSize,
      offset: this.offset
    });
  }

}
