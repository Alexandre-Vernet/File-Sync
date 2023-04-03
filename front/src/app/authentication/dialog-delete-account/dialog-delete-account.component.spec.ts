import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteAccountComponent } from './dialog-delete-account.component';

describe('DialogDeleteAccountComponent', () => {
  let component: DialogDeleteAccountComponent;
  let fixture: ComponentFixture<DialogDeleteAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
