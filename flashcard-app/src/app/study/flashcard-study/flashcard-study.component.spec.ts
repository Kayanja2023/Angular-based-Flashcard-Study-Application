import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashcardStudyComponent } from './flashcard-study.component';
import { provideRouter } from '@angular/router';
import { FlashcardService } from '../services/flashcard.service';
import { BehaviorSubject } from 'rxjs';
import { FlashcardSet } from '../../models/flashcard-set.model';

describe('FlashcardStudyComponent', () => {
  let component: FlashcardStudyComponent;
  let fixture: ComponentFixture<FlashcardStudyComponent>;
  let mockFlashcardService: jasmine.SpyObj<FlashcardService>;
  const mockSet: FlashcardSet = {
    id: '1',
    name: 'Test Set',
    description: 'Test Description',
    cards: [
      { id: '1', question: 'What is 2+2?', answer: '4' },
      { id: '2', question: 'What is 3+3?', answer: '6' }
    ]
  };

  beforeEach(async () => {
    mockFlashcardService = jasmine.createSpyObj('FlashcardService', ['deleteSet'], {
      flashcardSets$: new BehaviorSubject<FlashcardSet[]>([mockSet])
    });

    await TestBed.configureTestingModule({
      imports: [FlashcardStudyComponent],
      providers: [
        { provide: FlashcardService, useValue: mockFlashcardService },
        provideRouter([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FlashcardStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load flashcard set on init', () => {
    expect(component.setId).toBe('1');
    expect(component.cards.length).toBe(2);
  });

  it('should flip the card when flipCard is called', () => {
    expect(component.showAnswer).toBeFalse();
    component.flipCard();
    expect(component.showAnswer).toBeTrue();
  });

  it('should go to next card', () => {
    expect(component.currentIndex).toBe(0);
    component.nextCard();
    expect(component.currentIndex).toBe(1);
  });

  it('should not go beyond last card', () => {
    component.currentIndex = 1;
    component.nextCard();
    expect(component.currentIndex).toBe(1); // stays at last
  });

  it('should go to previous card', () => {
    component.currentIndex = 1;
    component.previousCard();
    expect(component.currentIndex).toBe(0);
  });

  it('should not go before first card', () => {
    component.currentIndex = 0;
    component.previousCard();
    expect(component.currentIndex).toBe(0); // stays at 0
  });
});
