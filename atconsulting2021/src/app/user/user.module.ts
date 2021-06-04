import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';





@NgModule({

  imports: [
    CommonModule,
    UserRoutingModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule

  ]
})
export class UserModule { }
