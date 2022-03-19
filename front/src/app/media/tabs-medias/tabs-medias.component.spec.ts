import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsMediasComponent } from './tabs-medias.component';

describe('TabsMediasComponent', () => {
  let component: TabsMediasComponent;
  let fixture: ComponentFixture<TabsMediasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsMediasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsMediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
