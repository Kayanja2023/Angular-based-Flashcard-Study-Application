import { Flashcard } from './flashcard.model';

export interface FlashcardSet {
  id: string;
  name: string;
  description: string;
  cards: Flashcard[];
}
