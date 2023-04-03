import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteAllFilesComponent } from './dialog-delete-all-files.component';

describe('DialogDeleteAllFilesComponent', () => {
  let component: DialogDeleteAllFilesComponent;
  let fixture: ComponentFixture<DialogDeleteAllFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteAllFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteAllFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
