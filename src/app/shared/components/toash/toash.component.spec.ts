import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToashComponent } from './toash.component';

describe('ToashComponent', () => {
  let component: ToashComponent;
  let fixture: ComponentFixture<ToashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
