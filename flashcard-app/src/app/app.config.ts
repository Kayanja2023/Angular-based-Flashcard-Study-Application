// This is the main application configuration file for angular
// It sets up core functionality and dependencies

// Import ApplicationConfig from Angular's core module
// This interface defines that face of the application's configurations
import { ApplicationConfig } from '@angular/core';

// This is to import the router service at the application level
import { provideRouter } from '@angular/router';

// This contains all the route definitions for the application
import { routes } from './app.routes';

// Define and export the application configuration
// This is to bootstrap the angular application with necessary providers
export const appConfig: ApplicationConfig = {

  // providers array contains all the services that should be available application-wide
  // Register the router service with the application's routes
  providers: [provideRouter(routes)]
};
