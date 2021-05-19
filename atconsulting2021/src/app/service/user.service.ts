import { User } from '../../model/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList!:User[];
  array!:User[];
  ELEMENT_DATA!:User[];

  private baseUrl = environment.host;

  private auth_token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYyMDY1NDUwOH0.ga_qOUF8PWCws_s89DVfWGphrjFFUFgHzDeNSyNQ2gnITc4Ec5nKIKeZ4vXinTv19w5q3KJxwV2CCqlOeUOVqg";

   headers!: HttpHeaders;

getAll_Users(): Observable<User[]>
  {
    return this.http.get<User[]>(this.baseUrl+"/api/userDtos/findAll", { headers: this.headers });

  }


 // headers: HttpHeaders = new HttpHeaders();


  constructor(private http: HttpClient) {
    this.ELEMENT_DATA=[{Code_user:1,Nom_user:"user1"},
    {Code_user:3,Nom_user:"hopitale3"},
    {Code_user:4,Nom_user:"hopitale4"},
    {Code_user:5,Nom_user:"hopitale5"},
    {Code_user:6,Nom_user:"hopitale6"},
    {Code_user:7,Nom_user:"hopitale7"},
    {Code_user:2,Nom_user:"hopitale2"},
    {Code_user:8,Nom_user:"hopitale8"},
    {Code_user:9,Nom_user:"hopitale9"},
    {Code_user:10,Nom_user:"hopitale10"},
    {Code_user:11,Nom_user:"hopitale11"}];
    this.userList=this.ELEMENT_DATA;
   }





   //getAllHopitals(): Observable<Hopital[]>
   getAllUsers()
   {
     //const token=sessionStorage.getItem('jhi-authenticationtoken');
     const token=this.auth_token;
     console.log(token);
     this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
     console.log("salut test ...... ");
     this.http.get<User[]>(this.baseUrl+"/api/userDtos/findAll", { headers: this.headers }).subscribe(response => {
      // this.userList = response.map(item => new User(item));
      console.log("server connection ok + response : " + response);
  });

     return this.userList;
   }
  /* getAllHopitals() {
    return this.hopitalList;
  }*/


  saveUser(user:User) {
    this.userList.push(user);
  }

  updateUser(user:User){


    this.userList.map(h=>{
      if (h.Code_user==user.Code_user){
        h.Nom_user=user.Nom_user;
        console.log(user.Nom_user,"qz");
      }
      return h;
    });

        console.log("update 1 rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
        console.log(this.userList);

        console.log("update");

      }


      deleteUser(user:User){
        this.userList=this.userList.filter(h =>h.Code_user!=user.Code_user);
        console.log("delete!!!!")
        console.log(this.userList);
        console.log("*********************")

      }



}
