import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockListComponent } from './block-list/block-list.component';
import { BlockDetailComponent } from './block-detail/block-detail.component';
import { NewBlockComponent } from './new-block/new-block.component';
import { EditBlockComponent } from './edit-block/edit-block.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [
    BlockListComponent,
    BlockDetailComponent,
    NewBlockComponent,
    EditBlockComponent,
  ],
})
export class BlockModule {}
