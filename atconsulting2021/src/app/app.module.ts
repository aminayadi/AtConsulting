import { FlexLayoutModule } from '@angular/flex-layout';
import { FileService } from './service/file.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { FileExplorerModule } from './file-explorer/file-explorer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    FileExplorerModule,
    FlexLayoutModule

  ],
  providers: [FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
