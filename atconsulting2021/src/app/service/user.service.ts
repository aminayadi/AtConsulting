import { User } from '../../model/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators'
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AccountInfo, SilentRequest } from '@azure/msal-browser';
import {  MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList!:User[];
  array!:User[];
  ELEMENT_DATA!:User[];
  public token:string;
  public account : AccountInfo ;
 

  private baseUrl = environment.host;

  private auth_token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYyMzc0OTIyM30.VCAXXSmFBeyIpaMz4xDQYXIErCBl5UxDxyxvz2qy6Lrzr5vKKLiefE09VFMfV6tHWmGRxcs8gX5pccP3RCp0tQ";

   headers!: HttpHeaders;

   getAll_Users(): Observable<User[]>
  {
    return this.http.get<User[]>(this.baseUrl+"/api/AllClient", { headers: this.headers });

  }

  constructor(private http: HttpClient, @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration, 
  private msalService: MsalService,) {

    this.userList=this.ELEMENT_DATA;
    this.msalService=msalService;
   }

   getAllUsers()
   {
     //const token=sessionStorage.getItem('jhi-authenticationtoken');
     const auth_token=this.auth_token;
     console.log(auth_token);
     this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + auth_token);
     console.log("salut test ...... ");
     this.http.get<User[]>(this.baseUrl+"/api/AllClient", { headers: this.headers }).subscribe(response => {
      // this.userList = response.map(item => new User(item));
      console.log("server connection ok + response : " + response);
  });

     return this.userList;
   }



  public async saveUser(user:User) {

    const auth_token=this.auth_token;

   // this.userList.push(user);
 
 console.log("TOKEN BLOC 60 : " + this.token);

      try
      {

 
  const OAuthSettings = {
  appId: '1ef615a5-a644-472b-a08c-cf01f7cbccf0',
  redirectUri: 'http://localhost:4200',
  scopes: [
    "Files.ReadWrite", "Files.ReadWrite.All", "Sites.ReadWrite.All"
  ]

};


const result = await this.msalService.acquireTokenSilent(OAuthSettings);
if (result) {
  //return result.forEach.accessToken;
   result.subscribe(res => {
     console.log("TOKKKKKKEN line 86 : " + res.accessToken );
console.log("aminn----"+res.account.username);
      this.account = res.account ; 





    console.log("TOKEN BLOC 97 : " + res.accessToken  );
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + auth_token)
                                   .set("Content-Type", "application/json");
    const headers = { 'Authorization': 'Bearer ', auth_token };
    
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
        "bearer_token": res.accessToken,
        "idFolder": "string"
      }
    });
    this.http.post<any>('http://localhost:8082/api/ajouterClient', body, {headers: this.headers}).subscribe(data => {
    
                          this.userList=this.ELEMENT_DATA;
    
                          console.log("server connection ok + response : " + data);
    
    });






   });
 } 


/*
if (this.msalGuardConfig.authRequest){
  this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
    .subscribe((response: AuthenticationResult) => {
      this.authService.instance.setActiveAccount(response.account);

}



/*
 const refreshAccessToken = async () => {
 
  
  try {
    const result = await this.msalService.acquireTokenSilent({
      account,
      scopes: loginRequest.scopes,
    });
    console.log("RESULTTTTTTTTTTTTTTTTTTTTTTTTTTTT" + result);

    if (result) {
      //return result.forEach   .accessToken;
       result.subscribe(res => {
         console.log("TOKKKKKKEN : " + res.accessToken );
        this.token = res.accessToken ;
        return res.accessToken;



      });
    }
*/
  } catch (error) {

          
          console.log("USER HATIMOUS " + error);


  }



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
