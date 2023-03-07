import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { ToastrService } from 'ngx-toastr';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  loggedInUser: any = {};
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private readonly oAuthservice: OAuthService,
    private _snackBar: MatSnackBar
  ) { }

  // All Globally Function Here

  // Success Toastr
  successToastr(msg: any) {
    this.toastr.success(msg, 'success!', {
      timeOut: 3000,
    });
  }

  // Error Toastr
  errorToastr(msg: any) {
    this.toastr.error(msg, 'oops!', {
      timeOut: 3000,
    });
  }

  // Error Toastr
  openSnackBar(msg: any) {
    this._snackBar.open(msg, 'OK', {
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-success'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  logout() {
    localStorage.removeItem('dreamLoggedUser');
    this.router.navigate(['/login']);
  }
}
