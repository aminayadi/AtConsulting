import { Component } from '@angular/core';
import { FileElement } from './file-explorer/model/element';
import { Observable } from 'rxjs/Observable';
import { FileService } from './service/file.service';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { MsalService } from '@azure/msal-angular';
import { AlertsService } from './alerts.service';
import { Client } from '@microsoft/microsoft-graph-client';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public fileElements: Observable<FileElement[]>;

  constructor(public fileService: FileService,
    private _httpClient: HttpClient,
    private msalService: MsalService,
    private alertsService: AlertsService,
    private http: HttpClient) 
  {
  /*  this.authenticated = this.msalService.getAccount() != null;
    this.getUser().then((user) => {this.user = user});
*/
  }

  currentRoot: FileElement;
  currentPath: string;
  canNavigateUp = false;
  public authenticated: boolean;
  public user: User;
  public token: string;
  public dName:string;
  //private http: HttpClient;

  private readonly  URL = 'http://localhost:8082/api/atconsulting/service';

  ngOnInit() {

/*
    const headers = { 'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYxODMwNjY2Nn0.hokcCGCZGPMXcpTup6gm4hihP7uMVYnyxH8NsoAN5SOWvR1tD9TTXXOhSZB8u1RHkq8OSBnD_b2lkZBefMQOFQ',
    'Content-Type': 'application/json' };
const body = { bearer_token: this.token };
console.log("coucou je suis là : execute post backend ------------------")
return this.http.post<any>(this.URL, body, { headers }).subscribe(data => {
this.dName = data;
this.alertsService.addSuccess('Events from Graph', JSON.stringify(data, null, 9))
//console.log("-------AYA Add----------- :"+ data.JSON.stringify.value);

});*/




    const folderA = this.fileService.add({ name: 'Folder A', isFolder: true, parent: 'root' });
    this.fileService.add({ name: 'Folder B', isFolder: true, parent: 'root' });
    this.fileService.add({ name: 'Folder C', isFolder: true, parent: folderA.id });
    this.fileService.add({ name: 'File A', isFolder: false, parent: 'root' });
    this.fileService.add({ name: 'File B', isFolder: false, parent: 'root' });

    this.updateFileElementQuery();
  }

  addFolder(folder: { name: string }) {
    this.fileService.add({ isFolder: true, name: folder.name, parent: this.currentRoot ? this.currentRoot.id : 'root' });
    this.updateFileElementQuery();
  }

  removeElement(element: FileElement) {
    this.fileService.delete(element.id);
    this.updateFileElementQuery();
  }

  navigateToFolder(element: FileElement) {
    this.currentRoot = element;
    this.updateFileElementQuery();
    this.currentPath = this.pushToPath(this.currentPath, element.name);
    this.canNavigateUp = true;
  }

  navigateUp() {
    if (this.currentRoot && this.currentRoot.parent === 'root') {
      this.currentRoot = null;
      this.canNavigateUp = false;
      this.updateFileElementQuery();
    } else {
      this.currentRoot = this.fileService.get(this.currentRoot.parent);
      this.updateFileElementQuery();
    }
    this.currentPath = this.popFromPath(this.currentPath);
  }

  moveElement(event: { element: FileElement; moveTo: FileElement }) {
    this.fileService.update(event.element.id, { parent: event.moveTo.id });
    this.updateFileElementQuery();
  }

  renameElement(element: FileElement) {
    this.fileService.update(element.id, { name: element.name });
    this.updateFileElementQuery();
  }

  updateFileElementQuery() {
    this.fileElements = this.fileService.queryInFolder(this.currentRoot ? this.currentRoot.id : 'root');
  }

  pushToPath(path: string, folderName: string) {
    let p = path ? path : '';
    p += `${folderName}/`;
    return p;
  }

  popFromPath(path: string) {
    let p = path ? path : '';
    let split = p.split('/');
    split.splice(split.length - 2, 1);
    p = split.join('/');
    return p;
  }
/*
  private async getUser(): Promise<User> {
    if (!this.authenticated) return null;

    let graphClient = Client.init({
      // Initialize the Graph client with an auth
      // provider that requests the token from the
      // auth service
      authProvider: async(done) => {
        let token = await this.getAccessToken()
          .catch((reason) => {
            done(reason, null);
          });

        if (token)
        {
          console.log("TOKEN = " + token);
          this.token = token ;
          let results = this.ngOnInit();



          done(null, token);
        } else {
          done("Could not get an access token", null);
        }
      }
    });

    // Get the user from Graph (GET /me)
    let graphUser: MicrosoftGraph.User = await graphClient
      .api('/me')
      .select('displayName,mail,mailboxSettings,userPrincipalName')
      .get();

    let user = new User();
    user.displayName = graphUser.displayName;
    // Prefer the mail property, but fall back to userPrincipalName
    user.email = graphUser.mail || graphUser.userPrincipalName;
    user.timeZone = graphUser.mailboxSettings.timeZone;

    // Use default avatar
    user.avatar = '/assets/no-profile-photo.png';

    return user;
  }
  // </getUserSnippet>

/*
    // Silently request an access token
    async getAccessToken(): Promise<string> {
      let result = await this.msalService.acquireTokenSilent(OAuthSettings)
        .catch((reason) => {
          this.alertsService.addError('Get token failed', JSON.stringify(reason, null, 2));
        });
  
      if (result) {
        return result.accessToken;
      }
  
      // Couldn't get a token
      this.authenticated = false;
      return null;
    }
*/

}
