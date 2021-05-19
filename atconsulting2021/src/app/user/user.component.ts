import { User } from '../../model/user';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/service/user.service';

import { UserDialogComponent } from './userDialog/user-dialog.component';
import { UserDtDialogComponent } from './userDtDialog/user-dt-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,AfterViewInit  {


  Users$!:Observable<User[]>;
  dataSource!: MatTableDataSource<User> ;
  userList!:User[];

  displayedColumns: string[] = ['Code_user', 'Nom_user','detail','update','delete'];

  searchKey!: string;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  Code_user!:number;
  Nom_user!:string;
  vvv:any;

  constructor(private dialog:MatDialog,private userService :UserService ) { }
  ngAfterViewInit(): void {
    this.sort1();
    this.paginator1();
    this.getAllUsers();
  }

  sort1(){
    this.dataSource.sort = this.sort;
  }

  paginator1(){
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    this.getData();

  }

  getData(){
    this.dataSource = new MatTableDataSource<User>(this.userService.getAllUsers() );
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    const dialogConfig =new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {Code_User: this.Code_user, Nom_User: this.Nom_user};
    const dialogRef =this.dialog.open(UserDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != undefined){

        console.log(result);


      //this.dataSource.data.push(result);

      this.userService.saveUser(result);

      console.log(this.dataSource.data);
      this.paginator1();
      this.sort1();
      }




    });



  }

  onDelete(user:User){
    this.userService.deleteUser(user);
    console.log("ondelete!!!!")
    console.log(user,"aaaaaa");
    this.getData();
    this.paginator1();
    this.sort1();
  }


  onDetails(user:User){

    const dialogConfig =new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {Code_user: user.Code_user, Nom_User: user.Nom_user};
    console.log("["+user.Code_user+", "+user.Nom_user + "]");
    const dialogRef =this.dialog.open(UserDtDialogComponent,dialogConfig);

  }


  onUpdate(user:User){

    const dialogConfig =new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {Code_user: user.Code_user, Nom_user: user.Nom_user};;
    console.log("["+user.Code_user+", "+user.Nom_user + "]");
    const dialogRef =this.dialog.open(UserDialogComponent,dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed update');
      if (result == undefined){

        console.log("vous avez clicker sur cancel");
      }
      else if (result.Code_user == user.Code_user){

        this.userService.updateUser(result);
        this.paginator1();
        this.sort1();

      }
      else {

        console.log("il ne faut pas changer le code du user");

      }





    });


  }



  getAllUsers(){
    let artists: any[] = [];
    this.Users$ = this.userService.getAll_Users();
    this.Users$.subscribe(response => {
      artists = response ;
      console.log("server connection ok + detail response : " + artists[0].nom_User);
  }



    )
  }

}
