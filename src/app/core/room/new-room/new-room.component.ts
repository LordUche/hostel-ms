import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoomService } from '../room.service';
import { Room } from '../room';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss'],
})
export class NewRoomComponent implements OnInit, OnDestroy {
  room: Room;
  roomSubs: Subscription;
  form = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(
    private rs: RoomService,
    private fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<NewRoomComponent>
  ) {}

  ngOnInit() {
    this.roomSubs = this.rs.room$.subscribe(room => (this.room = room));
  }

  createRoom() {
    if (this.form.valid) {
      const newRoom: Room = {
        ...this.form.value,
        roomCount: 0,
      };
      this.rs.create(newRoom).then(roomRef => {
        this.form.reset();
        this.dialogRef.close();
        this.router.navigate([this.rs.baseUrl, roomRef.id]);
      });
    }
  }

  ngOnDestroy() {
    this.roomSubs.unsubscribe();
  }
}
