import { NgModule } from '@angular/core';
import { BlockListComponent } from '../block/block-list/block-list.component';
import { HostelListComponent } from './hostel-list/hostel-list.component';
import { HostelDetailComponent } from './hostel-detail/hostel-detail.component';
import { NewHostelComponent } from './new-hostel/new-hostel.component';
import { MaterialModule } from '../material.module';
import { CoreModule } from '../core.module';

@NgModule({
  imports: [MaterialModule, CoreModule],
  declarations: [
    BlockListComponent,
    HostelListComponent,
    HostelDetailComponent,
    NewHostelComponent,
  ],
  entryComponents: [NewHostelComponent],
})
export class HostelModule {}
