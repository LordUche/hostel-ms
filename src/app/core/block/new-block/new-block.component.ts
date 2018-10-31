import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { BlockService } from '../block.service';
import { Block } from '../block';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-block',
  templateUrl: './new-block.component.html',
  styleUrls: ['./new-block.component.scss'],
})
export class NewBlockComponent implements OnInit, OnDestroy {
  block: Block;
  blockSubs: Subscription;
  form = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(
    private bs: BlockService,
    private fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<NewBlockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { hostelId: string }
  ) {}

  ngOnInit() {
    this.blockSubs = this.bs.block$.subscribe(block => (this.block = block));
  }

  createBlock() {
    if (this.form.valid) {
      const newBlock: Block = {
        ...this.form.value,
        hostelId: this.data.hostelId,
        roomCount: 0,
      };
      this.bs.create(newBlock).then(blockRef => {
        this.router.navigate([this.bs.baseUrl, blockRef.id]);
      });
      this.form.reset();
      this.dialogRef.close();
    }
  }

  ngOnDestroy() {
    this.blockSubs.unsubscribe();
  }
}
