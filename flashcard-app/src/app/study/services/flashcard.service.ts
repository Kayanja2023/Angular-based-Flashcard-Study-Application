// Angular's dependency injection system uses this decorator
import { Injectable } from '@angular/core';

// BehaviorSubject is used for maintaining and sharing state across components
import { BehaviorSubject } from 'rxjs';

// Custom interface that defines the structure of a flashcard set
import { FlashcardSet } from '../../models/flashcard-set.model';

// @Injectable marks this class as available for dependency injection
// providedIn: 'root' means there's only one instance shared across the entire app
@Injectable({
  providedIn: 'root',
})
export class FlashcardService {
  private flashcardSetsSubject = new BehaviorSubject<FlashcardSet[]>([]);

     // Public observable that components can subscribe to
    //Components can only read this data, not modify it
    //Emits new value whenever flashcard sets change


  flashcardSets$ = this.flashcardSetsSubject.asObservable();
  // ===== INITIALIZATION =====
  // Constructor runs when the service is first created
  // Loads any saved flashcard data from localStorage

  constructor() {
    this.loadFromLocalStorage();
  }
  // ===== STORAGE METHODS =====
  // Saves the current state of flashcard sets to browser's localStorage
  // This ensures data persists even when the browser is closed

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
          description: 'Basic arithmetic and operations',
          cards: [
            { id: '1', question: 'What is 1 + 1?', answer: '2' },
            { id: '2', question: 'What is 2 + 2?', answer: '4' },
            { id: '3', question: 'What is 3 + 3?', answer: '6' },
            { id: '4', question: 'What is 4 + 4?', answer: '8' },
            { id: '5', question: 'What is 5 + 5?', answer: '10' },
            { id: '6', question: 'What is 6 + 6?', answer: '12' },
            { id: '7', question: 'What is 7 + 7?', answer: '14' },
            { id: '8', question: 'What is 8 + 8?', answer: '16' },
            { id: '9', question: 'What is 9 + 9?', answer: '18' },
            { id: '10', question: 'What is 10 + 10?', answer: '20' }
          ]
        },
        {
          id: '2',
          name: 'HTML Elements',
          description: 'Common HTML tags and their uses',
          cards: [
            { id: '1', question: 'What is <div>?', answer: 'A container element' },
            { id: '2', question: 'What is <p>?', answer: 'Defines a paragraph' },
            { id: '3', question: 'What is <a>?', answer: 'Creates a hyperlink' },
            { id: '4', question: 'What is <img>?', answer: 'Embeds an image' },
            { id: '5', question: 'What is <ul>?', answer: 'Unordered list' },
            { id: '6', question: 'What is <ol>?', answer: 'Ordered list' },
            { id: '7', question: 'What is <form>?', answer: 'Container for input elements' },
            { id: '8', question: 'What is <input>?', answer: 'Creates an input field' },
            { id: '9', question: 'What is <button>?', answer: 'Creates a clickable button' },
            { id: '10', question: 'What is <header>?', answer: 'Defines header section' }
          ]
        },
        {
          id: '3',
          name: 'CSS Properties',
          description: 'Basic CSS styling properties',
          cards: [
            { id: '1', question: 'What is margin?', answer: 'Space outside an element' },
            { id: '2', question: 'What is padding?', answer: 'Space inside an element' },
            { id: '3', question: 'What is display?', answer: 'How element is shown' },
            { id: '4', question: 'What is position?', answer: 'How element is positioned' },
            { id: '5', question: 'What is color?', answer: 'Text color property' },
            { id: '6', question: 'What is flex?', answer: 'Flexible box layout' },
            { id: '7', question: 'What is grid?', answer: 'Grid layout system' },
            { id: '8', question: 'What is width?', answer: 'Element width property' },
            { id: '9', question: 'What is height?', answer: 'Element height property' },
            { id: '10', question: 'What is border?', answer: 'Element border property' }
          ]
        },
        {
          id: '4',
          name: 'Git Commands',
          description: 'Common Git version control commands',
          cards: [
            { id: '1', question: 'What is git add?', answer: 'Stage changes' },
            { id: '2', question: 'What is git commit?', answer: 'Save staged changes' },
            { id: '3', question: 'What is git push?', answer: 'Upload to remote' },
            { id: '4', question: 'What is git pull?', answer: 'Download from remote' },
            { id: '5', question: 'What is git branch?', answer: 'Create new branch' },
            { id: '6', question: 'What is git merge?', answer: 'Combine branches' },
            { id: '7', question: 'What is git clone?', answer: 'Copy repository' },
            { id: '8', question: 'What is git status?', answer: 'Check file status' },
            { id: '9', question: 'What is git log?', answer: 'View commit history' },
            { id: '10', question: 'What is git init?', answer: 'Start new repository' }
          ]
        },
        {
          id: '5',
          name: 'TypeScript Types',
          description: 'Basic TypeScript type system',
          cards: [
            { id: '1', question: 'What is string?', answer: 'Text data type' },
            { id: '2', question: 'What is number?', answer: 'Numeric data type' },
            { id: '3', question: 'What is boolean?', answer: 'True/false data type' },
            { id: '4', question: 'What is array?', answer: 'List of items type' },
            { id: '5', question: 'What is interface?', answer: 'Object structure definition' },
            { id: '6', question: 'What is enum?', answer: 'Set of named constants' },
            { id: '7', question: 'What is any?', answer: 'Dynamic type' },
            { id: '8', question: 'What is void?', answer: 'No return value' },
            { id: '9', question: 'What is null?', answer: 'No value assigned' },
            { id: '10', question: 'What is undefined?', answer: 'Value not assigned' }
          ]
        },
        {
          id: '6',
          name: 'SQL Queries',
          description: 'Basic SQL database queries',
          cards: [
            { id: '1', question: 'What is SELECT?', answer: 'Retrieve data' },
            { id: '2', question: 'What is INSERT?', answer: 'Add new data' },
            { id: '3', question: 'What is UPDATE?', answer: 'Modify existing data' },
            { id: '4', question: 'What is DELETE?', answer: 'Remove data' },
            { id: '5', question: 'What is WHERE?', answer: 'Filter results' },
            { id: '6', question: 'What is JOIN?', answer: 'Combine tables' },
            { id: '7', question: 'What is GROUP BY?', answer: 'Group results' },
            { id: '8', question: 'What is ORDER BY?', answer: 'Sort results' },
            { id: '9', question: 'What is HAVING?', answer: 'Filter groups' },
            { id: '10', question: 'What is DISTINCT?', answer: 'Unique values only' }
          ]
        },
        {
          id: '7',
          name: 'JavaScript Functions',
          description: 'Basic JavaScript function definitions',
          cards: [
            { id: '1', question: 'What is function?', answer: 'Block of reusable code' },
            { id: '2', question: 'What is arrow function?', answer: 'Compact syntax' },
            { id: '3', question: 'What is anonymous function?', answer: 'No name' },
            { id: '4', question: 'What is IIFE?', answer: 'Immediately invoked' },
            { id: '5', question: 'What is callback function?', answer: 'Passed as argument' },
            { id: '6', question: 'What is higher-order function?', answer: 'Takes or returns functions' },
            { id: '7', question: 'What is closure?', answer: 'Access to outer scope' },
            { id: '8', question: 'What is method?', answer: 'Function in object' },
            { id: '9', question: 'What is constructor?', answer: 'Creates object' },
            { id: '10', question: 'What is prototype?', answer: 'Shared properties' }
          ]
        },
        {
          id: '8',
          name: 'HTTP Status',
          description: 'Common HTTP status codes',
          cards: [
            { id: '1', question: 'What is 200?', answer: 'OK - Success' },
            { id: '2', question: 'What is 201?', answer: 'Created successfully' },
            { id: '3', question: 'What is 400?', answer: 'Bad Request' },
            { id: '4', question: 'What is 401?', answer: 'Unauthorized' },
            { id: '5', question: 'What is 403?', answer: 'Forbidden' },
            { id: '6', question: 'What is 404?', answer: 'Not Found' },
            { id: '7', question: 'What is 500?', answer: 'Server Error' },
            { id: '8', question: 'What is 502?', answer: 'Bad Gateway' },
            { id: '9', question: 'What is 503?', answer: 'Service Unavailable' },
            { id: '10', question: 'What is 504?', answer: 'Gateway Timeout' }
          ]
        }

      ];
      this.flashcardSetsSubject.next(mockSets);
      this.saveToLocalStorage();
    }
  }

  // Returns a copy of all flashcard sets
  getSets(): FlashcardSet[] {
    return [...this.flashcardSetsSubject.value];
  }

  // Finds and returns a specific flashcard set by its ID
  getSetById(id: string): FlashcardSet | undefined {
    return this.getSets().find(set => set.id === id);
  }

  // Adds a new flashcard set to the collection
  addSet(set: FlashcardSet): void {
    const updated = [...this.getSets(), set];
    this.flashcardSetsSubject.next(updated);
    this.saveToLocalStorage();
  }

  // Updates an existing flashcard set
  updateSet(updatedSet: FlashcardSet): void {
    const updated = this.getSets().map(set =>
      set.id === updatedSet.id ? updatedSet : set
    );
    this.flashcardSetsSubject.next(updated);
    this.saveToLocalStorage();
  }

  // Removes a flashcard set by its ID
  deleteSet(id: string): void {
    const filtered = this.getSets().filter(set => set.id !== id);
    this.flashcardSetsSubject.next(filtered);
    this.saveToLocalStorage();
  }
}
