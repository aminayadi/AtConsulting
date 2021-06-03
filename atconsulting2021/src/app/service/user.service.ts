import { User } from '../../model/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList!:User[];
  array!:User[];
  ELEMENT_DATA!:User[];

  private baseUrl = environment.host;

  private auth_token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYyMjExNDIxNH0.9zkojbRSMhfMc_5rIWy7ALVtq5f6JCchoNuJCxLhyimHq9f9U3b15TIFG1fQOR0Jv_Pu-YHcavtBF5qR3dK4Rg";

   headers!: HttpHeaders;

   getAll_Users(): Observable<User[]>
  {
    return this.http.get<User[]>(this.baseUrl+"/api/AllClient", { headers: this.headers });

  }

  constructor(private http: HttpClient) {

    this.userList=this.ELEMENT_DATA;
   }

   getAllUsers()
   {
     //const token=sessionStorage.getItem('jhi-authenticationtoken');
     const token=this.auth_token;
     console.log(token);
     this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
     console.log("salut test ...... ");
     this.http.get<User[]>(this.baseUrl+"/api/AllClient", { headers: this.headers }).subscribe(response => {
      // this.userList = response.map(item => new User(item));
      console.log("server connection ok + response : " + response);
  });

     return this.userList;
   }



  saveUser(user:User) {
    this.userList.push(user);
  }

  updateUser(user:User){


    this.userList.map(h=>{
      if (h.id==user.id){
        h.adress=user.adress;
        console.log(user.adress,"qz");
      }
      return h;
    });


        console.log(this.userList);



      }


      deleteUser(user:User){
        this.userList=this.userList.filter(h =>h.id!=user.id);
        console.log(this.userList);


      }



}
