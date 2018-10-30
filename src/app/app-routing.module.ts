import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HostelListComponent } from './core/hostel/hostel-list/hostel-list.component';
import { BlockListComponent } from './core/block/block-list/block-list.component';
import { RoomListComponent } from './core/room/room-list/room-list.component';
import { HostelDetailComponent } from './core/hostel/hostel-detail/hostel-detail.component';
import { BlockDetailComponent } from './core/block/block-detail/block-detail.component';
import { LoginComponent } from './core/login/login.component';
import { AllocateRoomComponent } from './core/occupant/allocate-room/allocate-room.component';

const routes: Routes = [
  { path: '', component: HostelListComponent },
  { path: 'hostels', component: HostelListComponent },
  {
    path: 'hostels/:id',
    component: HostelDetailComponent,
  },
  { path: 'blocks/:id', component: BlockDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: AllocateRoomComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
