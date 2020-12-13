import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmsFormComponent } from './farms-form.component';

describe('FarmsFormComponent', () => {
  let component: FarmsFormComponent;
  let fixture: ComponentFixture<FarmsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
