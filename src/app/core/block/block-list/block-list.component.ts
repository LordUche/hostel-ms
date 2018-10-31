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
import { BlockService } from '../block.service';
import { Block } from '../block';
import { Subscription, Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { NewBlockComponent } from '../new-block/new-block.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss'],
})
export class BlockListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  hostelId: string;
  blocksSubs: Subscription;

  dataSource = new MatTableDataSource<Block>([]);
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'roomCount', 'actions'];

  isHandset$: Observable<boolean> = this.breakpoint
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private bs: BlockService,
    private breakpoint: BreakpointObserver,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.blocksSubs = this.bs.blocks$.subscribe(
        blocks => (this.dataSource.data = blocks)
      );
      this.hostelId = params.get('id');
      this.bs.getAll(this.hostelId);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filter(term: string) {
    this.dataSource.filter = term.trim().toLowerCase();
  }

  addBlock() {
    this.dialog.open(NewBlockComponent, {
      data: { hostelId: this.hostelId },
    });
  }

  delete(block: Block) {
    this.dialog
      .open(DeleteDialogComponent, {
        data: { name: block.name, type: 'block' },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.bs.delete(block.id);
        }
      });
  }

  ngOnDestroy(): void {
    this.blocksSubs.unsubscribe();
  }
}
