import { NgModule } from '@angular/core';
import { RoomListComponent } from '../room/room-list/room-list.component';
import { BlockDetailComponent } from './block-detail/block-detail.component';
import { NewBlockComponent } from './new-block/new-block.component';
import { EditBlockComponent } from './edit-block/edit-block.component';
import { MaterialModule } from '../material.module';
import { CoreModule } from '../core.module';

@NgModule({
  imports: [CoreModule, MaterialModule],
  declarations: [
    RoomListComponent,
    BlockDetailComponent,
    NewBlockComponent,
    EditBlockComponent,
  ],
  entryComponents: [NewBlockComponent],
})
export class BlockModule {}
