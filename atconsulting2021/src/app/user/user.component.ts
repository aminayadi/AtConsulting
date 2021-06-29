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
import Swal from 'sweetalert2';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,AfterViewInit  {


  Users$!:Observable<User[]>;
  dataSource!: MatTableDataSource<User> ;
  userList!:User[];

  displayedColumns: string[] = ['name', 'email','phone','contact','type','adress'];

  searchKey!: string;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  id!:number;
  name!:string;
  email!:string;
  phone!:string;
  contact!:string;
  type!:string;
  adress!:string;
  vvv:any;
  public token : string;
  public account: any;
  
 

  constructor(private dialog:MatDialog,private userService :UserService) { }
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

    this.token = history.state.token
    this.account = history.state.account;
   // this.msalService = history.state.msalService;

    console.log("user.component.ts line 68 : " + this.token);



    console.log("ngoninit ................... " + history.state.token);
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
    dialogConfig.data = {id: this.id, name: this.name , email:this.email , phone:this.phone , contact : this.contact , type : this.type, adress:this.adress};
    const dialogRef =this.dialog.open(UserDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
Swal.fire(
      'success!',
      'Votre client a été ajouté avec succès .',
      'success')
      console.log('The dialog was closed');
      if (result != undefined){
        console.log(result);
      this.dataSource.data.push(result);
      this.userService.token = this.token ;
      this.userService.account = this.account;
      //this.userService.msalService = this.msalService;
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
    dialogConfig.data = {id: this.id, name: this.name , email:this.email , phone:this.phone , contact : this.contact , type : this.type, adress:this.adress};
    console.log("["+user.id+", "+user.adress + "]");
    const dialogRef =this.dialog.open(UserDtDialogComponent,dialogConfig);

  }


  onUpdate(user:User){

    const dialogConfig =new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {id: user.id, adress: user.adress};;
    console.log("["+user.id+", "+user.adress + "]");
    const dialogRef =this.dialog.open(UserDialogComponent,dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed update');
      if (result == undefined){

        console.log("vous avez clicker sur cancel");
      }
      else if (result.id == user.id){

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
      this.dataSource.data = response ;
      artists = response ;
     // console.log("server connection ok + detail response : " + artists[0].adress);
  }



    )
  }

}
