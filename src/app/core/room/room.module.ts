import { NgModule } from '@angular/core';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { NewRoomComponent } from './new-room/new-room.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { MaterialModule } from '../material.module';
import { OccupantModule } from '../occupant/occupant.module';
import { CoreModule } from '../core.module';

@NgModule({
  imports: [CoreModule, MaterialModule, OccupantModule],
  declarations: [RoomDetailComponent, NewRoomComponent, EditRoomComponent],
  entryComponents: [NewRoomComponent],
})
export class RoomModule {}
