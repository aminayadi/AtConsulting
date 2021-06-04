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

   // this.userList.push(user);
 const token=this.auth_token;
     console.log(token);
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + token)
                                   .set("Content-Type", "application/json");
    const headers = { 'Authorization': 'Bearer ', token };

    const body = JSON.stringify({
      "client": {
        "adress": user.adress,
        "contact": user.contact,
        "email": user.email,
        "id": 0,
        "name": user.name,
        "phone": user.phone,
        "type": user.type
      },
      "connection": {
        "bearer_token": "EwB4A8l6BAAU6k7+XVQzkGyMv7VHB/h4cHbJYRAAAQXoJNdnp3xdvZR09okeVnRnghvSYdRpkc7ZgdBJVOgE/kChq9PiHL7IyVEZrwVGj3048iudl1MbeUu82WhZR6gzDI1VWG5t8y37mJat5gtApAdHwxub74/mBi/uCHRgFiP/gRxhHuHm8BzFjlMk4c/hbwIppSRrU00+Jo69v1jgBoyfbSyeBupdcyDZbXTqJ0620xO9gyQO/JVPgBmRQrT57atChBqZ/oi325W8qEeRdg4u45zEo/VlOZx94ylErc4K3N9IytYH5v4s/JPC1l7yW9PRTHTk8yEmfVgwpMy84vdYdWyyWQtXgiXIs49Q4xELo19IsIT7NEWekgl4cAoDZgAACCb+rqmXDgfFSAIKVJIfZYGhuVB9E5ID4/RmvcHjxsi1zYj3kG6sAgA/NrN6QPXMV1RSlqqeabCnxAhrNZ3U+9IOkFp1kPxtlCwq/aV7gboADsNTkdIwv0doUe15rk+BapsBVg4LufAD+M8i2qd3j5s4QReWgPwVDIdGKLHRlSkpZfXaBZH+LPLNGz97b4+AVqfCm9glIaD7/dw0Cf7+z1vypVvNq5sK69+okV0QGdGt5M4cNXmRBbt+FWWuZM+KxVCz4ihCIywoY6XjUjsik2GATnjsT5EdrovpNf1xoR7CB3LnP1OS1eckUQx+2VukpCOyyh3adwmh1EN8YIMSn/BWJ5ot8oFpyImOF9GxRBKzW5plM8vtB9/MLMEbksDYLZEEIk61uxSOorc/GJ9WATp381mb3ACCgxV4KwxjNNZ7fhdG/fSyw8LJplDiadxIIUBv3G9qIc5ea9k640MOIoIqUWL0U3ljI0I6Oxim6YjzhkPUwgiV55XXgRAUGQSGuYmaGGcJ/v45975aDbP/jZAmPyeHW73L5SqN0T+ZWy1S8H0Kp6J0wdFDBhrxe7Gsa25/NvjxP+QBubeVGaKCceSgiMDiXMYtCSoz+t9GNOkV709dcUyVarFwuvGdLOP9hty33PzfUDNiNdSiI5ZxiVmvRqP42wfGJuuBjPYDjZ0EtDZD9WJEkvhr7QSUKy1fsdQNf5Ss9yvq7x/Vtr/gGm5jYDSQwXS/BDv+Tce2Yx3PVA/oNDJxQ1K+TpxoXO7y5tyRL58+vIzTv7TuHYYFfB3Hl44C",
        "idFolder": "string"
      }
    });
    this.http.post<any>('http://localhost:8082/api/ajouterClient', body, {headers: this.headers}).subscribe(data => {

                          //this.userList=this.ELEMENT_DATA;

                          console.log("server connection ok + response : " + data);

  })


       /*
       .post("http://localhost:8082/api/ajouterClient", JSON.stringify(user), {headers: this.headers},)
       .toPromise()
       .then(res => {   // this.userList = response.map(item => new User(item));
       console.log("server connection ok + response : " + res);})
       .catch(error => console.log('error', error));

*/


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
