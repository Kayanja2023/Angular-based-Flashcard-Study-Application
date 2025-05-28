import { Component, OnInit } from '@angular/core';
import { FlashcardService } from '../services/flashcard.service';
import { FlashcardSet } from '../../models/flashcard-set.model';
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-flashcard-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './flashcard-list.component.html',
  styleUrls: ['./flashcard-list.component.css']
})
export class FlashcardListComponent implements OnInit {
  flashcardSets$!: Observable<FlashcardSet[]>;

  constructor(private flashcardService: FlashcardService) {}

  ngOnInit(): void {
    this.flashcardSets$ = this.flashcardService.flashcardSets$;
  }
  confirmDelete(id: string): void {
    const confirmed = confirm('Are you sure you want to delete this flashcard set?');
    if (confirmed) {
      this.flashcardService.deleteSet(id);
    }
  }

}
