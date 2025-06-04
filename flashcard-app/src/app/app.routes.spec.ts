import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { Location } from '@angular/common';
import { routes } from './app.routes';

describe('App Routing', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation();
  });

  it('should navigate to /list', fakeAsync(() => {
    router.navigate(['/list']);
    tick();
    expect(location.path()).toBe('/list');
  }));

  it('should navigate to /edit/new', fakeAsync(() => {
    router.navigate(['/edit/new']);
    tick();
    expect(location.path()).toBe('/edit/new');
  }));

  it('should navigate to /study/:id', fakeAsync(() => {
    router.navigate(['/study/abc123']);
    tick();
    expect(location.path()).toBe('/study/abc123');
  }));

  it('should redirect empty path to /list', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/list');
  }));
});
