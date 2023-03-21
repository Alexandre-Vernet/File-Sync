import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateFileNameComponent } from './dialog-update-file-name.component';

describe('UpdateFileNameComponent', () => {
  let component: DialogUpdateFileNameComponent;
  let fixture: ComponentFixture<DialogUpdateFileNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateFileNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUpdateFileNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
