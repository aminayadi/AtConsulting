import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDtDialogComponent } from './userDtDialog/user-dt-dialog.component';
import { UserDialogComponent } from './userDialog/user-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { UserComponent } from './user.component';





@NgModule({
  declarations: [
    UserDtDialogComponent,
    UserDialogComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule
  ]
})
export class UserModule { }
