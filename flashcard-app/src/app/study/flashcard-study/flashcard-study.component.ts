// Import required Angular core features and routing modules
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// Import models for type safety
import { Flashcard } from '../../models/flashcard.model';
import { FlashcardSet } from '../../models/flashcard-set.model';

// Import service for flashcard operations
import { FlashcardService } from '../services/flashcard.service';

// Import required Angular and Material modules
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


// Component decorator with metadata
@Component({
  // HTML element selector for this component
  selector: 'app-flashcard-study',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './flashcard-study.component.html',
  styleUrls: ['./flashcard-study.component.css']
})


// Component class for studying flashcards
export class FlashcardStudyComponent implements OnInit {
  setId = '';
  cards: Flashcard[] = [];
  currentIndex = 0;
  showAnswer = false;

  // Inject required services
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flashcardService: FlashcardService
  ) {}

  // Initialize component
  ngOnInit(): void {
    this.setId = this.route.snapshot.paramMap.get('id') ?? '';
    console.log('Navigated to Study Set with ID:', this.setId);

    this.flashcardService.flashcardSets$.subscribe((sets: FlashcardSet[]) => {
      console.log('Flashcard sets available:', sets);

      const set = sets.find((s) => s.id === this.setId);
      if (set) {
        // If set found, assign its cards to our local array
        // ?? [] provides empty array as fallback if cards is null/undefined
        this.cards = set.cards ?? [];
        // Debug log for loaded cards
        console.log('Loaded cards:', this.cards);
      } else {
        // Warning if set not found with given ID
        console.warn('Flashcard set not found with ID:', this.setId);
      }
    });
  }

  // Getter for accessing the current flashcard
  get currentCard(): Flashcard | null {
    return this.cards[this.currentIndex] || null;
  }

  // Switch between showing question and answer
  flipCard(): void {
    this.showAnswer = !this.showAnswer;
  }

  nextCard(): void {
    // Check if there are more cards ahead
    if (this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
      // Reset to show question side
      this.showAnswer = false;
    }
  }

  previousCard(): void {
    // Check if there are cards before current
    if (this.currentIndex > 0) {
      // Decrement the card index
      this.currentIndex--;
      // Reset to show question side
      this.showAnswer = false;
    }
  }

  // Navigate to the list route
  backToList(): void {
    this.router.navigate(['/list']);
  }
}
