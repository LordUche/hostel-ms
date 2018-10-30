import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Input,
} from '@angular/core';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog,
} from '@angular/material';
import { RoomService } from '../room.service';
import { Room } from '../room';
import { Subscription, Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { NewRoomComponent } from '../new-room/new-room.component';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  @Input()
  blockId: string;
  dataSource = new MatTableDataSource<Room>();
  dataSubs: Subscription;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['roomNo', 'capacity', 'occupantCount'];

  isHandset$: Observable<boolean> = this.breakpoint
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private rs: RoomService,
    private breakpoint: BreakpointObserver,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSubs = this.rs.rooms$.subscribe(rooms => {
      this.dataSource.data = rooms;
    });
    this.rs.getAll(this.blockId);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filter(term: string) {
    this.dataSource.filter = term.trim().toLowerCase();
  }

  addRoom() {
    this.dialog.open(NewRoomComponent);
  }

  delete(room: Room) {
    this.dialog
      .open(DeleteDialogComponent, {
        data: { name: room.roomNo, type: 'room' },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.rs.delete(room.id);
        }
      });
  }

  ngOnDestroy() {
    this.dataSubs.unsubscribe();
  }
}
