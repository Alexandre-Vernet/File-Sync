import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMediasComponent } from './list-medias.component';

describe('ListMediasComponent', () => {
  let component: ListMediasComponent;
  let fixture: ComponentFixture<ListMediasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMediasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
