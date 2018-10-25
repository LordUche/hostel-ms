import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { HostelModule } from './hostel/hostel.module';
import { BlockModule } from './block/block.module';
import { RoomModule } from './room/room.module';
import { OccupantModule } from './occupant/occupant.module';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HostelModule,
    BlockModule,
    RoomModule,
    OccupantModule,
    LayoutModule,
  ],
  declarations: [
    HomeComponent,
    ErrorComponent,
    LoginComponent,
    NavigationComponent,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    HostelModule,
    BlockModule,
    RoomModule,
    OccupantModule,
    LayoutModule,
  ],
})
export class CoreModule {}
