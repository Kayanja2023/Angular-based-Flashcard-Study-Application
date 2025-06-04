// Import necessary functions and components from Angular modules
// Import a function from Angular that starts up the application
import { bootstrapApplication } from '@angular/platform-browser';

// Import the root component of the application (the first component that gets loaded)
import { AppComponent } from './app/app.component';

// Import the application wide configuration settings
import { appConfig } from './app/app.config';

// Bootstrap the Angular application with the root component and configuration
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error('App startup error:', err));

// The application will first load the AppComponent and apply any configurations specified in appConfig
