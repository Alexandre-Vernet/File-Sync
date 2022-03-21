import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsFilesComponent } from './tabs-files.component';

describe('TabsMediasComponent', () => {
  let component: TabsFilesComponent;
  let fixture: ComponentFixture<TabsFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
