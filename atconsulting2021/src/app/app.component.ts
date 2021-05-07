import { Component } from '@angular/core';
import { FileElement } from './file-explorer/model/file-element';
import { Observable } from 'rxjs';
import { FileService } from './service/file.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public fileElements: Observable<FileElement[]>;

  constructor(public fileService: FileService) {}

  currentRoot: FileElement;
  currentPath: string;
  canNavigateUp = false;

  ngOnInit() {
    const folderA = this.fileService.add({ name: 'Folder A', isFolder: true, parent: 'root' });
    this.fileService.add({ name: 'Folder B', isFolder: true, parent: 'root' });
    this.fileService.add({ name: 'Folder C', isFolder: true, parent: folderA.id });
    this.fileService.add({ name: 'File A', isFolder: false, parent: 'root' });
    this.fileService.add({ name: 'File B', isFolder: false, parent: 'root' });

    this.updateFileElementQuery();
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
}
