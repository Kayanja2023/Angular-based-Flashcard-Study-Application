// Essential Angular imports for component functionality
import { Component, OnInit } from '@angular/core';

// Form-related imports for handling reactive forms
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

// Routing-related imports for navigation and route parameters
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// Service and model imports
import { FlashcardService } from '../services/flashcard.service';
import { FlashcardSet } from '../../models/flashcard-set.model';

// Common Angular functionality import
import { CommonModule } from '@angular/common';

// Angular Material UI component imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-flashcard-edit',
  standalone: true,
  templateUrl: './flashcard-edit.component.html',
  styleUrls: ['./flashcard-edit.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule
  ]
})


export class FlashcardEditComponent implements OnInit {

  // Form declaration - will hold the entire flashcard set form structure
  form!: FormGroup;
  // Stores the ID of the current flashcard set being edited
  setId = '';
  // Flag to track whether we're in edit mode or create mode
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private flashcardService: FlashcardService
  ) {}

  // Get the ID from the route parameters, if no ID is found, default to 'new'
  ngOnInit(): void {
    this.setId = this.route.snapshot.paramMap.get('id') ?? 'new';

    // Determine if we're editing (setId !== 'new') or creating (setId === 'new')
    this.isEditing = this.setId !== 'new';

    // If editing, get the existing flashcard set, otherwise set to null
    const currentSet = this.isEditing
      ? this.flashcardService.getSetById(this.setId)
      : null;

    this.form = this.fb.group({
      name: [currentSet?.name || '', Validators.required],
      description: [currentSet?.description || '', Validators.required],
      cards: this.fb.array(
        currentSet?.cards.map(card =>
          this.fb.group({
            question: [card.question, Validators.required],
            answer: [card.answer, Validators.required]
          })
        ) || Array.from({ length: 10 }, () => this.createCard())
      )
    });
  }

  get cards(): FormArray {
    return this.form.get('cards') as FormArray;
  }

  createCard(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });
  }
  // Method to add a new card to the form
  addCard(): void {
    this.cards.push(this.createCard());
  }

  // Method to remove a card at specified index
  removeCard(index: number): void {
    if (this.cards.length > 1) {
      this.cards.removeAt(index);
    }
  }

  // Method to handle form submission
  onSubmit(): void {

    // First validation check: Ensure minimum number of cards
    if (this.cards.length < 10) {
      alert('Each flashcard set must contain at least 10 cards.');
      return;
    }

    // Second validation check: Form validity
    if (this.form.invalid) {
      this.form.markAllAsTouched();  // Triggers validation UI for all fields
      alert('Please fill out all required fields correctly.');
      return;
    }

    // Create updated flashcard set object
    const updatedSet: FlashcardSet = {
      // Generate new ID if creating new set, otherwise use existing ID
      id: this.setId === 'new' ? Date.now().toString() : this.setId,
      ...this.form.value
    };


    // Conditional operator to either update existing or add new set
    this.isEditing
      ? this.flashcardService.updateSet(updatedSet)
      : this.flashcardService.addSet(updatedSet);

    // Navigate back to list view with error handling
    this.router.navigate(['/list']).catch(err => console.error('Navigation error:', err));
  }

  // Method to navigate back to the flashcard list
  backToList(): void {
    this.router.navigate(['/list']).catch(err => console.error('Navigation error:', err));
  }
}
