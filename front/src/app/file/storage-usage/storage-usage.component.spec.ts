import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageUsageComponent } from './storage-usage.component';

describe('StorageUsageComponent', () => {
  let component: StorageUsageComponent;
  let fixture: ComponentFixture<StorageUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorageUsageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
