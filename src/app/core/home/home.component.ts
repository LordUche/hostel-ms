import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

   constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.auth.user$ !== null) {
    	this.auth.user$.subscribe(user => {
    		if (user.roles.admin) {
		      this.router.navigate(['/hostels'], { skipLocationChange: true });
	    	} else {
		      this.router.navigate(['/register'], { skipLocationChange: true });
	    	}
	    });
    }
  }

}
