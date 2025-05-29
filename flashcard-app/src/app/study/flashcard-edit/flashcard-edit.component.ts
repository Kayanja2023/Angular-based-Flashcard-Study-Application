import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FlashcardService } from '../services/flashcard.service';
import { FlashcardSet } from '../../models/flashcard-set.model';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-flashcard-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './flashcard-edit.component.html',
  styleUrls: ['./flashcard-edit.component.css']
})
export class FlashcardEditComponent implements OnInit {
  form!: FormGroup;
  setId = '';
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private flashcardService: FlashcardService
  ) {}

  ngOnInit(): void {
    this.setId = this.route.snapshot.paramMap.get('id') ?? 'new';
    this.isEditing = this.setId !== 'new';

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
        ) || [this.createCard(), this.createCard()]
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

  addCard(): void {
    this.cards.push(this.createCard());
  }

  removeCard(index: number): void {
    if (this.cards.length > 1) {
      this.cards.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const updatedSet: FlashcardSet = {
        id: this.setId === 'new' ? Date.now().toString() : this.setId,
        name: formValue.name,
        description: formValue.description,
        cards: formValue.cards
      };

      if (this.isEditing) {
        this.flashcardService.updateSet(updatedSet);
      } else {
        this.flashcardService.addSet(updatedSet);
      }

      this.router.navigate(['/list']);
    }
  }

  backToList(): void {
    this.router.navigate(['/list']);
  }
}
