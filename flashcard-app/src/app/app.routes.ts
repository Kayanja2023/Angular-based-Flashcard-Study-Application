// Imports the Routes type from the angular router module
import { Routes } from '@angular/router';

// Import components that will be used in the routing configuration
import { FlashcardListComponent } from './study/flashcard-list/flashcard-list.component';
import { FlashcardEditComponent } from './study/flashcard-edit/flashcard-edit.component';
import { FlashcardStudyComponent } from './study/flashcard-study/flashcard-study.component';

// Define the application's routing configuration
export const routes: Routes = [
  // Default route: redirect empty path to 'list'
  { path: '', redirectTo: 'list', pathMatch: 'full' },

  // Route to display the list of flashcards
  { path: 'list', component: FlashcardListComponent },

  // Route for editing a specific flashcard, ':id' is a route parameter
  { path: 'edit/:id', component: FlashcardEditComponent },

  // Route for studying a specific flashcard, ':id' is a route parameter
  { path: 'study/:id', component: FlashcardStudyComponent },

  // Wildcard route: redirect any unmatched routes to 'list'
  { path: '**', redirectTo: 'list' } // fallback route
];
