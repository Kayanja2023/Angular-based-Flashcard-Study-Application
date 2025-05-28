import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardService } from '../services/flashcard.service';
import { FlashcardSet } from '../../models/flashcard-set.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-flashcard-edit',
  standalone: true,
  templateUrl: './flashcard-edit.component.html',
  styleUrls: ['./flashcard-edit.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class FlashcardEditComponent implements OnInit {
  form!: FormGroup;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private flashcardService: FlashcardService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      cards: this.fb.array([])
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const existingSet = this.flashcardService.getSetById(id);
      if (existingSet) {
        this.isEditing = true;
        this.form.patchValue({
          name: existingSet.name,
          description: existingSet.description
        });

        existingSet.cards.forEach(card =>
          this.cards.push(
            this.fb.group({
              question: [card.question, Validators.required],
              answer: [card.answer, Validators.required]
            })
          )
        );
      }
    }

    if (this.cards.length === 0) {
      this.addCard();
    }
  }

  get cards(): FormArray {
    return this.form.get('cards') as FormArray;
  }

  addCard(): void {
    this.cards.push(
      this.fb.group({
        question: ['', Validators.required],
        answer: ['', Validators.required]
      })
    );
  }

  removeCard(index: number): void {
    this.cards.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const flashcardSet: FlashcardSet = {
      id: this.route.snapshot.paramMap.get('id') || new Date().getTime().toString(),
      name: this.form.value.name,
      description: this.form.value.description,
      cards: this.form.value.cards
    };

    if (this.isEditing) {
      this.flashcardService.updateSet(flashcardSet);
    } else {
      this.flashcardService.addSet(flashcardSet);
    }

    this.router.navigate(['/list']);
  }
}
