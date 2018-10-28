import { Component, OnInit, OnDestroy } from '@angular/core';
import { HostelService } from '../hostel.service';
import { Hostel } from '../hostel';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-hostel',
  templateUrl: './new-hostel.component.html',
  styleUrls: ['./new-hostel.component.scss'],
})
export class NewHostelComponent implements OnInit, OnDestroy {
  hostel: Hostel;
  hostelSubs: Subscription;
  form = this.fb.group({
    name: ['', Validators.required],
    gender: [null, Validators.required],
  });

  constructor(
    private hs: HostelService,
    private fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<NewHostelComponent>
  ) {}

  ngOnInit() {
    this.hostelSubs = this.hs.hostel$.subscribe(
      hostel => (this.hostel = hostel)
    );
  }

  createHostel() {
    if (this.form.valid) {
      const newHostel: Hostel = {
        ...this.form.value,
        blockCount: 0,
      };
      this.hs.create(newHostel).then(hostelRef => {
        this.form.reset();
        this.dialogRef.close();
        this.router.navigate([this.hs.baseUrl, hostelRef.id]);
      });
    }
  }

  ngOnDestroy() {
    this.hostelSubs.unsubscribe();
  }
}
