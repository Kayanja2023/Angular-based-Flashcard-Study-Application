// Essential Angular imports
import { Component, OnInit } from '@angular/core';
import { FlashcardService } from '../services/flashcard.service';
import { FlashcardSet } from '../../models/flashcard-set.model';
import { Observable } from 'rxjs';

// Required imports for standalone component
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Material UI component imports
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
  /**
   * Observable stream of flashcard sets
   * @property {Observable<FlashcardSet[]>} flashcardSets$ - Holds the list of flashcard sets
   * - The $ suffix follows Angular convention for Observable variables
   * - The ! is a TypeScript non-null assertion operator
   * - Observable<FlashcardSet[]> indicates an observable stream of flashcard set arrays
   */
  flashcardSets$!: Observable<FlashcardSet[]>;





  constructor(private flashcardService: FlashcardService) {}

  ngOnInit(): void {
    // Assigns the service's observable stream to the component's property
    this.flashcardSets$ = this.flashcardService.flashcardSets$;
  }


  confirmDelete(id: string): void {
    const confirmed = confirm('Are you sure you want to delete this flashcard set?');
    if (confirmed) {
      // Calls the service method to handle the actual deletion
      this.flashcardService.deleteSet(id);
    }
  }

}
