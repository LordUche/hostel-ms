import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog,
} from '@angular/material';
import { HostelService } from '../hostel.service';
import { Hostel } from '../hostel';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { NewHostelComponent } from '../new-hostel/new-hostel.component';

@Component({
  selector: 'app-hostel-list',
  templateUrl: './hostel-list.component.html',
  styleUrls: ['./hostel-list.component.scss'],
})
export class HostelListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  dataSource = new MatTableDataSource<Hostel>();
  dataSubs: Subscription;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'gender', 'blockCount', 'actions'];

  isHandset$: Observable<boolean> = this.breakpoint
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private hs: HostelService,
    private breakpoint: BreakpointObserver,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSubs = this.hs.hostels$.subscribe(hostels => {
      this.dataSource.data = hostels;
    });
    this.hs.getAll();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filter(term: string) {
    this.dataSource.filter = term.trim().toLowerCase();
  }

  addHostel() {
    this.dialog.open(NewHostelComponent);
  }

  delete(hostel: Hostel) {
    this.dialog
      .open(DeleteDialogComponent, {
        data: { name: hostel.name, type: 'hostel' },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.hs.delete(hostel.id);
        }
      });
  }

  ngOnDestroy() {
    this.dataSubs.unsubscribe();
  }
}
