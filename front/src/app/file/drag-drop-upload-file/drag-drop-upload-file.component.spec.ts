import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropUploadFileComponent } from './drag-drop-upload-file.component';

describe('DragDropUploadFileComponent', () => {
  let component: DragDropUploadFileComponent;
  let fixture: ComponentFixture<DragDropUploadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropUploadFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
