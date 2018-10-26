import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostelListComponent } from './hostel-list/hostel-list.component';
import { HostelDetailComponent } from './hostel-detail/hostel-detail.component';
import { NewHostelComponent } from './new-hostel/new-hostel.component';
import { EditHostelComponent } from './edit-hostel/edit-hostel.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [
    HostelListComponent,
    HostelDetailComponent,
    NewHostelComponent,
    EditHostelComponent,
  ],
})
export class HostelModule {}
