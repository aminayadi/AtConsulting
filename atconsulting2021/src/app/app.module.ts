import { UserComponent } from './user/user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FileService } from './service/file.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
import { MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalModule,
MsalService} from '@azure/msal-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { IPublicClientApplication} from '@azure/msal-browser';
import { MsalGuard, MsalBroadcastService,  MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalRedirectComponent } from '@azure/msal-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { FileExplorerModule } from './file-explorer/file-explorer.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { ProfileComponent } from './profile/profile.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { UserDtDialogComponent } from './user/userDtDialog/user-dt-dialog.component';
import { UserDialogComponent } from './user/userDialog/user-dialog.component';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1; // Remove this line to use Angular Universal
export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      // clientId: '6226576d-37e9-49eb-b201-ec1eeb0029b6', // Prod enviroment. Uncomment to use.
      //clientId: '3fba556e-5d4a-48e3-8e1a-fd57c12cb82e', // PPE testing environment
      clientId:'1ef615a5-a644-472b-a08c-cf01f7cbccf0',
       authority: 'https://login.microsoftonline.com/common', // Prod environment. Uncomment to use.
      //authority: 'https://login.windows-ppe.net/common', // PPE testing environment.
      redirectUri: '/',
      postLogoutRedirectUri: '/'
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11. Remove this line to use Angular Universal
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  // protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']); // Prod environment. Uncomment to use.
  protectedResourceMap.set('https://graph.microsoft-ppe.com/v1.0/me', ['user.read']);
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read']
    },
    loginFailedRoute: '/login-failed'
  };
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    DetailComponent,
    UserComponent,
    UserDtDialogComponent,
    UserDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    HttpClientModule,
    MsalModule,
    FileExplorerModule,
    FlexLayoutModule,
    MsalModule,
    MatCardModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule
  ],
  providers: [FileService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },


      {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}},



    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
