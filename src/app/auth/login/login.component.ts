import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { GlobalService } from 'src/app/service/global.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
// import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  loginForm: any = FormGroup
  constructor(
    private router: Router,
    public api: AuthService,
    public gs: GlobalService,
    private fb: FormBuilder,
    // private socialAuthService: SocialAuthService
  ) {
    this.loginForm = this.fb.group({
      username: ["paras@123", Validators.required],
      password: ["paras@123", Validators.required]
    })
  }

  ngOnInit(): void {
  }

  loginWithGoogle() {
    this.api.loginWithGoogle();
  }

  loginFormSubmit(form: any) {
    console.log(form)
    this.api.post('users/login', form.value).then((res: any) => {
      console.log("res >>>", res);
      if (res.status) {
        this.gs.successToastr(res.msg);
        this.gs.loggedInUser = res.data;
        localStorage.setItem("dreamLoggedUser", JSON.stringify(this.gs.loggedInUser));
        this.router.navigate(['/main-layout']);
        // this.router.navigate(['/airlines']);
      } else {
        this.gs.errorToastr(res.msg);
      }
    })
  }

  skipLogin() {
    this.router.navigate(['/airlines'])
  }
}
