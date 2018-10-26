import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HostelListComponent } from './core/hostel/hostel-list/hostel-list.component';
import { BlockListComponent } from './core/block/block-list/block-list.component';
import { RoomListComponent } from './core/room/room-list/room-list.component';

const routes: Routes = [
  { path: '', component: HostelListComponent },
  { path: 'hostels', component: HostelListComponent },
  { path: 'hostels/:id/blocks', component: BlockListComponent },
  { path: 'blocks/:id/rooms', component: RoomListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
