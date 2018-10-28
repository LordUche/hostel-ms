import { NgModule } from '@angular/core';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MaterialModule } from '../core/material.module';

@NgModule({
  imports: [MaterialModule],
  declarations: [DeleteDialogComponent],
  entryComponents: [DeleteDialogComponent],
})
export class SharedModule {}
