import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Flashcard } from '../../models/flashcard.model';
import { FlashcardSet } from '../../models/flashcard-set.model';
import { FlashcardService } from '../services/flashcard.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-flashcard-study',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './flashcard-study.component.html',
  styleUrls: ['./flashcard-study.component.css']
})
export class FlashcardStudyComponent implements OnInit {
  setId = '';
  cards: Flashcard[] = [];
  currentIndex = 0;
  showAnswer = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flashcardService: FlashcardService
  ) {}

  ngOnInit(): void {
    this.setId = this.route.snapshot.paramMap.get('id') ?? '';
    this.flashcardService.flashcardSets$.subscribe((sets: FlashcardSet[]) => {
      const set = sets.find((s) => s.id === this.setId);
      if (set) {
        this.cards = set.cards;
      }
    });
  }

  get currentCard(): Flashcard | null {
    return this.cards[this.currentIndex] || null;
  }

  flipCard(): void {
    this.showAnswer = !this.showAnswer;
  }

  nextCard(): void {
    if (this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
      this.showAnswer = false;
    }
  }

  backToList(): void {
    this.router.navigate(['/list']);
  }
}
