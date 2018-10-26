import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { BlockListDataSource } from './block-list-datasource';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styles: [
    `
      .full-width-table {
        width: 100%;
      }
    `,
  ],
})
export class BlockListComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  dataSource: BlockListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new BlockListDataSource(this.paginator, this.sort);
  }
}
