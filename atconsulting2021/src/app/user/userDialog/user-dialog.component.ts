import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/model/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) { }
    
  ngOnInit(): void {
  }

  onNoClick(){
    Swal.fire(
      'Cancel!',
      'Vous avez anuler l operation.',
      'warning')
    this.dialogRef.close();
    console.log("cancel");

  }

}
