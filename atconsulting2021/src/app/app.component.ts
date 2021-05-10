import { Component } from '@angular/core';
import { FileElement } from './file-explorer/model/file-element';
import { Observable } from 'rxjs';
import { FileService } from './service/file.service';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AlertsService } from './alerts.service';
import { HttpClient } from '@angular/common/http';
import { OAuthSettings } from './oauth';
import { User } from './user';
import { Client } from '@microsoft/microsoft-graph-client';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { Subject } from 'rxjs';
import { AuthenticationResult, InteractionStatus, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import {  MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';


import { OnInit } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';

import { EventMessage, EventType } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public fileElements: Observable<FileElement[]>;

  private readonly _destroying$ = new Subject<void>();

  constructor(public fileService: FileService,
    private msalService: MsalService,
    private alertsService: AlertsService,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private http: HttpClient) {}
   

  currentRoot: FileElement;
  currentPath: string;
  canNavigateUp = false;
  isIframe = false;
  public authenticated: boolean;
  public user: User;
  public token: string;
  loginDisplay = false;

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  ngOnInit() {
    //this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal
    console.log("before set login display ");
    this.setLoginDisplay();
    console.log("after set login display ");
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      })
      console.log("destroying ....");
  

    const folderA = this.fileService.add({ name: 'Folder A', isFolder: true, parent: 'root' });
    this.fileService.add({ name: 'Folder B', isFolder: true, parent: 'root' });
    this.fileService.add({ name: 'Folder C', isFolder: true, parent: folderA.id });
    this.fileService.add({ name: 'File A', isFolder: false, parent: 'root' });
    this.fileService.add({ name: 'File B', isFolder: false, parent: 'root' });

    this.updateFileElementQuery();
  }
  checkAndSetActiveAccount(){
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }
  // tslint:disable-next-line:typedef
  addFolder(folder: { name: string }) {
    this.fileService.add({ isFolder: true, name: folder.name, parent: this.currentRoot ? this.currentRoot.id : 'root' });
    this.updateFileElementQuery();
  }

  // tslint:disable-next-line:typedef
  removeElement(element: FileElement) {
    this.fileService.delete(element.id);
    this.updateFileElementQuery();
  }

  // tslint:disable-next-line:typedef
  navigateToFolder(element: FileElement) {
    this.currentRoot = element;
    this.updateFileElementQuery();
    this.currentPath = this.pushToPath(this.currentPath, element.name);
    this.canNavigateUp = true;
  }

  // tslint:disable-next-line:typedef
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

  // tslint:disable-next-line:typedef
  moveElement(event: { element: FileElement; moveTo: FileElement }) {
    this.fileService.update(event.element.id, { parent: event.moveTo.id });
    this.updateFileElementQuery();
  }

  // tslint:disable-next-line:typedef
  renameElement(element: FileElement) {
    this.fileService.update(element.id, { name: element.name });
    this.updateFileElementQuery();
  }

  // tslint:disable-next-line:typedef
  updateFileElementQuery() {
    this.fileElements = this.fileService.queryInFolder(this.currentRoot ? this.currentRoot.id : 'root');
  }

  // tslint:disable-next-line:typedef
  pushToPath(path: string, folderName: string) {
    let p = path ? path : '';
    p += `${folderName}/`;
    return p;
  }

  // tslint:disable-next-line:typedef
  popFromPath(path: string) {
    let p = path ? path : '';
    let split = p.split('/');
    split.splice(split.length - 2, 1);
    p = split.join('/');
    return p;
  }

  // Silently request an access token
  async getAccessToken(): Promise<string> {
    try
    {
    const result = await this.msalService.acquireTokenSilent(OAuthSettings);
    if (result) {
      //return result.forEach   .accessToken;
    }}
    catch(reason) {
        this.alertsService.addError('Get token failed', JSON.stringify(reason, null, 2));
      }




    // Couldn't get a token
    this.authenticated = false;
    return null;
  }


  private async getUser(): Promise<User> {
    if (!this.authenticated) return null;

    const graphClient = Client.init({
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
  }


}
