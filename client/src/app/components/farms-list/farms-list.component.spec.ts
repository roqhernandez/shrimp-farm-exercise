import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmsListComponent } from './farms-list.component';

describe('FarmsListComponent', () => {
  let component: FarmsListComponent;
  let fixture: ComponentFixture<FarmsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
