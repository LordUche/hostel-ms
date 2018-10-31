import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService, User } from '../../shared/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styles: [`
    .sidenav-container {
      height: 100%;
    }

    .sidenav {
      width: 200px;
    }

    .sidenav .mat-toolbar {
      background: inherit;
    }

    .mat-toolbar.mat-primary {
      position: sticky;
      top: 0;
      z-index: 1;
    }

  `],
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  user: User;
  isAdmin: boolean;

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService, private router: Router) {
    this.auth.user$.subscribe(user => {
      this.user = user;
      this.isAdmin = this.auth.canDelete(user);
    });
  }

  logout() {
    this.auth.signOut();
    this.user = null;
    this.router.navigate(['']);
  }

}
