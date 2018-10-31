import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { HostelService } from '../hostel.service';
import { ActivatedRoute } from '@angular/router';
import { Hostel } from '../hostel';
import { Subscription } from 'rxjs';
import { BlockService } from '../../block/block.service';
import { Block } from '../../block/block';

@Component({
  selector: 'app-hostel-detail',
  templateUrl: './hostel-detail.component.html',
  styles: [],
})
export class HostelDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  hostel: Hostel;
  blocks: Block[];
  hostelSubs: Subscription;
  blocksSubs: Subscription;

  constructor(
    private hs: HostelService,
    private bs: BlockService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.hostelSubs = this.hs.hostel$.subscribe(hostel => {
      this.hostel = hostel;
    });
    this.blocksSubs = this.bs.blocks$.subscribe(
      blocks => (this.blocks = blocks)
    );
    this.route.paramMap.subscribe(params => {
      this.hs.get(params.get('id'));
      this.bs.getAll(params.get('id'));
    });
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.hostelSubs.unsubscribe();
    this.blocksSubs.unsubscribe();
  }
}
