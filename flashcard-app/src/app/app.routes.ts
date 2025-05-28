import { Routes } from '@angular/router';
import { FlashcardListComponent } from './study/flashcard-list/flashcard-list.component';
import { FlashcardEditComponent } from './study/flashcard-edit/flashcard-edit.component';
import { FlashcardStudyComponent } from './study/flashcard-study/flashcard-study.component';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: FlashcardListComponent },
  { path: 'edit/:id', component: FlashcardEditComponent },
  { path: 'study/:id', component: FlashcardStudyComponent },
  { path: '**', redirectTo: 'list' } // fallback route
];
