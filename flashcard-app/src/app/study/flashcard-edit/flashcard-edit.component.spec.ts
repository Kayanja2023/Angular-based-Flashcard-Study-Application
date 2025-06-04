import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashcardEditComponent } from './flashcard-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FlashcardService } from '../services/flashcard.service';
import { provideRouter } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FlashcardEditComponent', () => {
  let component: FlashcardEditComponent;
  let fixture: ComponentFixture<FlashcardEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [FlashcardEditComponent],
      providers: [
        provideRouter([]),
        {
          provide: FlashcardService,
          useValue: {
            getSetById: () => ({
              id: '1',
              name: 'Test Set',
              description: 'A test set',
              cards: [{ question: 'Q1', answer: 'A1' }]
            }),
            updateSet: jasmine.createSpy('updateSet'),
            addSet: jasmine.createSpy('addSet')
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the FlashcardEditComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with one card by default', () => {
    expect(component.cards.length).toBeGreaterThanOrEqual(1);
  });

  it('should validate form invalid if name is missing', () => {
    component.form.controls['name'].setValue('');
    expect(component.form.invalid).toBeTrue();
  });

  it('should validate form invalid if description is missing', () => {
    component.form.controls['description'].setValue('');
    expect(component.form.invalid).toBeTrue();
  });

  it('should add a new card to the form array', () => {
    const initialLength = component.cards.length;
    component.addCard();
    expect(component.cards.length).toBe(initialLength + 1);
  });

  it('should remove a card from the form array', () => {
    component.addCard();
    const initialLength = component.cards.length;
    component.removeCard(0);
    expect(component.cards.length).toBe(initialLength - 1);
  });
});
