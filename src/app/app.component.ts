import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './service/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Airline Assignments';

  constructor(
    private gs: GlobalService,
    private router: Router,
  ) {
    console.log("dreamLoggedUser >>", localStorage.getItem('dreamLoggedUser'))
    this.gs.loggedInUser = localStorage.getItem('dreamLoggedUser') ? JSON.parse(localStorage.getItem('dreamLoggedUser') || '') : {};
    // if (this.gs.loggedInUser && this.gs.loggedInUser._id) {
    //   this.router.navigate(['/airlines'])
    // }
  }
}
