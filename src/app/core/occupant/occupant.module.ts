import { NgModule } from '@angular/core';
import { CoreModule } from '../core.module';
import { AllocateRoomComponent } from './allocate-room/allocate-room.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [CoreModule, MaterialModule],
  declarations: [AllocateRoomComponent],
})
export class OccupantModule {}
