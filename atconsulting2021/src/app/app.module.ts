import { FlexLayoutModule } from '@angular/flex-layout';
import { FileService } from './service/file.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { MsalInterceptor, MsalModule,
MsalService} from '@azure/msal-angular';


import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { FileExplorerModule } from './file-explorer/file-explorer.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    FileExplorerModule,
    FlexLayoutModule,
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: '1ef615a5-a644-472b-a08c-cf01f7cbccf0',
        authority: "https://login.microsoftonline.com/common/",
        redirectUri: "http://localhost:4200/",
        postLogoutRedirectUri: "http://localhost:4200/",
        navigateToLoginRequestUrl: true
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE,
      }
      }), {
        interactionType: InteractionType.Popup,
        authRequest: {
          scopes: ['user.read']
        }
      }, {
        interactionType: InteractionType.Popup,
        protectedResourceMap: new Map([ 
          ['https://graph.microsoft.com/v1.0/me', ['user.read']]
        ])
      })

  ],
  providers: [FileService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
