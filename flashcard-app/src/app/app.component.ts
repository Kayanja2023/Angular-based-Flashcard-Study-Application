// Import required Angular core functionality and modules
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';

// Component decorator that defines metadata for the root component
@Component({
  // The CSS selector used to identify this component in HTM
  selector: 'app-root',

  // Enables standalone component architecture (new Angular feature)
  standalone: true,

  // Required modules for this component to function
  imports: [
    CommonModule,                 // Provides common Angular directives and pipes
    RouterOutlet,                 // Enables router functionality for child components
    MatToolbarModule              // Material Design toolbar component
  ],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// Root component class definition
export class AppComponent {

  // Title property used in the application
  title = 'Flashcard Study App';
}
