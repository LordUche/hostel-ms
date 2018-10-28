import { NgModule } from '@angular/core';
import { HostelListComponent } from './hostel-list/hostel-list.component';
import { HostelDetailComponent } from './hostel-detail/hostel-detail.component';
import { NewHostelComponent } from './new-hostel/new-hostel.component';
import { MaterialModule } from '../material.module';
import { CoreModule } from '../core.module';

@NgModule({
  imports: [MaterialModule, CoreModule],
  declarations: [
    HostelListComponent,
    HostelDetailComponent,
    NewHostelComponent,
  ],
  entryComponents: [NewHostelComponent],
})
export class HostelModule {}
