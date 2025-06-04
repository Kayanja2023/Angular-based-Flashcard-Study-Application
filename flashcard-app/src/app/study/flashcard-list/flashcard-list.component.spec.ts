import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashcardListComponent } from './flashcard-list.component';
import { FlashcardService } from '../services/flashcard.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('FlashcardListComponent', () => {
  let component: FlashcardListComponent;
  let fixture: ComponentFixture<FlashcardListComponent>;
  let mockFlashcardService: jasmine.SpyObj<FlashcardService>;

  beforeEach(async () => {
    mockFlashcardService = jasmine.createSpyObj('FlashcardService', ['deleteSet'], {
      flashcardSets$: of([
        { id: '1', name: 'Test Set', description: 'Test Desc', cards: [] }
      ])
    });

    await TestBed.configureTestingModule({
      imports: [
        FlashcardListComponent,  // ✅ STANDALONE: should go in imports, not declarations
        MatCardModule,
        MatButtonModule,
        MatIconModule
      ],
      providers: [{ provide: FlashcardService, useValue: mockFlashcardService }]
    }).compileComponents();

    fixture = TestBed.createComponent(FlashcardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the FlashcardListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteSet when confirmDelete is called and confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true); // Simulate user confirming
    component.confirmDelete('1');
    expect(mockFlashcardService.deleteSet).toHaveBeenCalledWith('1');
  });

  it('should NOT call deleteSet if confirm is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false); // Simulate user cancelling
    component.confirmDelete('1');
    expect(mockFlashcardService.deleteSet).not.toHaveBeenCalled();
  });
});
