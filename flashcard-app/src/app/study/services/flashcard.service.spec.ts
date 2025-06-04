import { TestBed } from '@angular/core/testing';
import { FlashcardService } from './flashcard.service';
import { FlashcardSet } from '../../models/flashcard-set.model';

describe('FlashcardService', () => {
  let service: FlashcardService;

  const mockSet: FlashcardSet = {
    id: '1',
    name: 'Test Set',
    description: 'Description',
    cards: [
      { id: '1', question: 'Q1', answer: 'A1' },
      { id: '2', question: 'Q2', answer: 'A2' }
    ]
  };

  beforeEach(() => {
    // Clear localStorage to avoid cross-test pollution
    localStorage.clear();

    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashcardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial mock data if localStorage is empty', () => {
    const sets = service.getSets();
    expect(sets.length).toBeGreaterThan(0); // Default mock data present
  });

  it('should add a new flashcard set', () => {
    service.addSet(mockSet);
    const sets = service.getSets();
    expect(sets.some(set => set.id === '1')).toBeTrue();
  });

  it('should update an existing flashcard set', () => {
    service.addSet(mockSet);
    const updatedSet = { ...mockSet, name: 'Updated Set' };
    service.updateSet(updatedSet);
    const result = service.getSetById('1');
    expect(result?.name).toBe('Updated Set');
  });

  it('should delete a flashcard set by ID', () => {
    service.addSet(mockSet);
    service.deleteSet('1');
    const result = service.getSetById('1');
    expect(result).toBeUndefined();
  });

  it('should persist and restore data using localStorage', () => {
    service.addSet(mockSet);
    const storedData = localStorage.getItem('flashcardSets');
    expect(storedData).toContain('Test Set');

    const newService = new FlashcardService(); // simulates page reload
    const loaded = newService.getSetById('1');
    expect(loaded?.name).toBe('Test Set');
  });
});
