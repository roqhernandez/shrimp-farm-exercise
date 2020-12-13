import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PondsFormComponent } from './ponds-form.component';

describe('PondsFormComponent', () => {
  let component: PondsFormComponent;
  let fixture: ComponentFixture<PondsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PondsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PondsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
