// src/app/study/services/flashcard.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FlashcardSet } from '../../models/flashcard-set.model';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  private flashcardSetsSubject = new BehaviorSubject<FlashcardSet[]>([]);
  flashcardSets$ = this.flashcardSetsSubject.asObservable();

  constructor() {
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
  }

  getSets(): FlashcardSet[] {
    return this.flashcardSetsSubject.value;
  }

  addSet(set: FlashcardSet): void {
    const updated = [...this.getSets(), set];
    this.flashcardSetsSubject.next(updated);
  }

  updateSet(updatedSet: FlashcardSet): void {
    const updated = this.getSets().map(set =>
      set.id === updatedSet.id ? updatedSet : set
    );
    this.flashcardSetsSubject.next(updated);
  }

  deleteSet(id: string): void {
    const filtered = this.getSets().filter(set => set.id !== id);
    this.flashcardSetsSubject.next(filtered);
  }

  getSetById(id: string): FlashcardSet | undefined {
    return this.getSets().find(set => set.id === id);
  }
}
