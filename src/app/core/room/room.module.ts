import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { NewRoomComponent } from './new-room/new-room.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [
    RoomListComponent,
    RoomDetailComponent,
    NewRoomComponent,
    EditRoomComponent,
  ],
})
export class RoomModule {}
