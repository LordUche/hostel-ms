import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HostelListComponent } from './core/hostel/hostel-list/hostel-list.component';
import { BlockListComponent } from './core/block/block-list/block-list.component';
import { RoomListComponent } from './core/room/room-list/room-list.component';
import { HostelDetailComponent } from './core/hostel/hostel-detail/hostel-detail.component';
import { BlockDetailComponent } from './core/block/block-detail/block-detail.component';
import { LoginComponent } from './core/login/login.component';
import { AllocateRoomComponent } from './core/occupant/allocate-room/allocate-room.component';
import { HomeComponent } from "./core/home/home.component";
import { AdminGuard } from './shared/admin.guard';
import { StudentGuard } from './shared/student.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'hostels', component: HostelListComponent, canActivate: [AdminGuard] },
  {
    path: 'hostels/:id',
    component: HostelDetailComponent, canActivate: [AdminGuard]
  },
  { path: 'blocks/:id', component: BlockDetailComponent, canActivate: [AdminGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: AllocateRoomComponent, canActivate: [StudentGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
