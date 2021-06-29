import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ImageService } from './image.service';
import { FileElement } from '../file-explorer/model/file-element';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  @Input() token: string;
  @Input() currentPath: String;
  selectedFile: ImageSnippet;

  private baseUrl = environment.host;
  private auth_token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYyMzc0OTIyM30.VCAXXSmFBeyIpaMz4xDQYXIErCBl5UxDxyxvz2qy6Lrzr5vKKLiefE09VFMfV6tHWmGRxcs8gX5pccP3RCp0tQ";
   headers!: HttpHeaders;
  constructor(private _router:Router,private http: HttpClient, private imageService: ImageService){}


  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
console.log("Binary Image 64 : " + this.selectedFile.src.toString() );
console.log("fileName  : " + this.selectedFile.file.name);
console.log("TOKEN BLOC  : " + this.token);
console.log("this.currentPath  : " + this.currentPath);

this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.auth_token)
.set("Content-Type", "application/json");
/*
if (this.currentPath ==null)
      this.currentPath = "root";
else 
      this.currentPath = "root/"+this.currentPath
*/
 const body = JSON.stringify({

  "connection": {
    "bearer_token": this.token,
    "idFolder": this.currentPath
  },
  "pName": this.selectedFile.file.name,
  "photo": this.selectedFile.src.substring(this.selectedFile.src.lastIndexOf(",") + 1)
 });
 this.http.put<any>('http://localhost:8082/api/ajouterPhoto', body, {headers: this.headers}).subscribe(data => {
 
                       
  
                       console.log("server connection ok + response : " + data);
                      
 });



    });

    reader.readAsDataURL(file);
    Swal.fire({
      title: 'succès?',
      text: 'Votre facture a été ajouté avec succès !',
      icon: 'success',
      confirmButtonText: 'Go To Home!',
     
    }).then((result) => {
      if (result.isConfirmed) {
        /*Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
          this._router.navigate([/home])
        )
      */
        this._router.navigate(["/home"])
      } 
    })
  }
}

function simpleAlertBox() {
  throw new Error('Function not implemented.');
}
