import { Component, OnInit } from '@angular/core';
import { Hostel } from '../../hostel/hostel';
import { FormBuilder, Validators } from '@angular/forms';
import { HostelService } from '../../hostel/hostel.service';
import { Block } from '../../block/block';
import { Room } from '../../room/room';
import { RoomService } from '../../room/room.service';
import { BlockService } from '../../block/block.service';

@Component({
  selector: 'app-allocate-room',
  templateUrl: './allocate-room.component.html',
  styles: [],
})
export class AllocateRoomComponent implements OnInit {
  hostels: Hostel[];
  blocks: Block[];
  rooms: Room[];

  hostelForm = this.fb.group({
    hostel: [null, Validators.required],
  });
  blockForm = this.fb.group({
    block: [null, Validators.required],
  });
  roomForm = this.fb.group({
    room: [null, Validators.required],
  });

  constructor(
    private hs: HostelService,
    private bs: BlockService,
    private rs: RoomService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.hs.hostels$.subscribe(hostels => (this.hostels = hostels));
    this.bs.blocks$.subscribe(blocks => (this.blocks = blocks));
    this.rs.rooms$.subscribe(rooms => (this.rooms = rooms));

    this.hs.getAll();
  }

  get hostel(): Hostel {
    return this.hostelForm.get('hostel').value;
  }

  get block(): Block {
    return this.blockForm.get('block').value;
  }

  get room(): Room {
    return this.roomForm.get('room').value;
  }

  fetchBlocks() {
    this.bs.getAll(this.hostel.id);
  }

  fetchRooms() {
    this.rs.getAll(this.block.id);
  }

  allocateRoom() {}
}
