import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDtDialogComponent } from './user-dt-dialog.component';

describe('UserDtDialogComponent', () => {
  let component: UserDtDialogComponent;
  let fixture: ComponentFixture<UserDtDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDtDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDtDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
