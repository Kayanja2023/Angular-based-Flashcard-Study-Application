import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FlashcardSet } from '../../models/flashcard-set.model';
import { Flashcard } from '../../models/flashcard.model';

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {
  private flashcardSetsSubject = new BehaviorSubject<FlashcardSet[]>([]);
  flashcardSets$ = this.flashcardSetsSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('flashcardSets', JSON.stringify(this.flashcardSetsSubject.value));
  }

  private loadFromLocalStorage(): void {
    const stored = localStorage.getItem('flashcardSets');
    if (stored) {
      this.flashcardSetsSubject.next(JSON.parse(stored));
    } else {
      const mockSets: FlashcardSet[] = [
        {
          id: '1',
          name: 'Math Basics',
          description: 'Basic math formulas and rules',
          cards: []
        },
        {
          id: '2',
          name: 'Biology 101',
          description: 'Intro to cell structures and functions',
          cards: []
        }
      ];
      this.flashcardSetsSubject.next(mockSets);
      this.saveToLocalStorage();
    }
  }

  getSets(): FlashcardSet[] {
    return [...this.flashcardSetsSubject.value];
  }

  getSetById(id: string): FlashcardSet | undefined {
    return this.getSets().find(set => set.id === id);
  }

  addSet(set: FlashcardSet): void {
    const updated = [...this.getSets(), set];
    this.flashcardSetsSubject.next(updated);
    this.saveToLocalStorage();
  }

  updateSet(updatedSet: FlashcardSet): void {
    const updated = this.getSets().map(set =>
      set.id === updatedSet.id ? updatedSet : set
    );
    this.flashcardSetsSubject.next(updated);
    this.saveToLocalStorage();
  }

  deleteSet(id: string): void {
    const filtered = this.getSets().filter(set => set.id !== id);
    this.flashcardSetsSubject.next(filtered);
    this.saveToLocalStorage();
  }
}
