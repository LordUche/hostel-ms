import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { HostelListDataSource } from './hostel-list-datasource';

@Component({
  selector: 'app-hostel-list',
  templateUrl: './hostel-list.component.html',
  styles: [`
    .full-width-table {
      width: 100%;
    }
    
  `],
})
export class HostelListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: HostelListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new HostelListDataSource(this.paginator, this.sort);
  }
}
