
import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dt-dialog',
  templateUrl: './user-dt-dialog.component.html',
  styleUrls: ['./user-dt-dialog.component.css']
})
export class UserDtDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef< UserDtDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit(): void {
  }

  onNoClick(){

    this.dialogRef.close();
    console.log("cancel");

  }

}
