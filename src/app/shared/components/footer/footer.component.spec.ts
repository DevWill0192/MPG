import { TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { SharedModule } from '../../shared.module';

describe('FooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
