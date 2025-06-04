import { Component, Input } from '@angular/core';
import { FlashcardSet } from '../../models/flashcard-set.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


// Component decorator with metadata
@Component({
  selector: 'app-flashcard-set',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './flashcard-set.component.html',
  styleUrls: ['./flashcard-set.component.css']
})

// Component class definition
export class FlashcardSetComponent {
  // Input property to receive FlashcardSet data from parent component
  // ! indicates this will be definitely assigned
  @Input() set!: FlashcardSet;
}
