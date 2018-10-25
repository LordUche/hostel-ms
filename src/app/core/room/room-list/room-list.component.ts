import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { RoomListDataSource } from './room-list-datasource';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styles: [`
    .full-width-table {
      width: 100%;
    }
    
  `],
})
export class RoomListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: RoomListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new RoomListDataSource(this.paginator, this.sort);
  }
}
