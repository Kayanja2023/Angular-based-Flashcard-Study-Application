import { Component, Input } from '@angular/core';
import { FlashcardSet } from '../../models/flashcard-set.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-flashcard-set',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './flashcard-set.component.html',
  styleUrls: ['./flashcard-set.component.css']
})
export class FlashcardSetComponent {
  @Input() set!: FlashcardSet;
}
