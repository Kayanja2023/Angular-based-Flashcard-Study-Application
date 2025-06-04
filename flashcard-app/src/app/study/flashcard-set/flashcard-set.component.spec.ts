import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashcardSetComponent } from './flashcard-set.component';

describe('FlashcardSetComponent', () => {
  let component: FlashcardSetComponent;
  let fixture: ComponentFixture<FlashcardSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlashcardSetComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
