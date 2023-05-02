import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalService } from './global.service';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: 'http://localhost:4200/login',
  clientId: '58322098771-99hgutjtge4m28f142q47t85mmfdok5e.apps.googleusercontent.com',
  scope: 'openid profile email'
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  serverURL = environment.serverURL;
  isSpinner: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private gs: GlobalService,
    private readonly oAuthservice: OAuthService,
  ) { }

  loginWithGoogle() {
    this.isSpinner = true;
    this.oAuthservice.configure(oAuthConfig);
    this.oAuthservice.loadDiscoveryDocument().then(() => {
      console.log("11111111");
      this.oAuthservice.tryLoginImplicitFlow().then(() => {
        console.log("222", !this.oAuthservice.hasValidAccessToken());
        if (!this.oAuthservice.hasValidAccessToken()) {
          this.oAuthservice.initLoginFlow();
          this.isSpinner = true;
        } else {
          this.oAuthservice.loadUserProfile().then((userProfile: any) => {
            let body = {
              name: userProfile.info.name,
              email: userProfile.info.email,
              sub: userProfile.info.sub,
              profile: userProfile.info.picture
            }
            this.post('users/login', body).then((res: any) => {
              if (res.status) {
                this.gs.successToastr(res.msg);
                this.gs.loggedInUser = res.data;
                localStorage.setItem("dreamLoggedUser", JSON.stringify(this.gs.loggedInUser))
                this.router.navigate(['/airlines']);
              } else {
                this.gs.errorToastr(res.msg);
              }
              this.isSpinner = true;
            })
          }, (err) => {
            this.gs.errorToastr(err);
            this.isSpinner = true;
            return {};
          })
        }
      }, (err) => {
        this.gs.errorToastr(err);
        this.isSpinner = true;
        return {};
      });
    }, (err) => {
      this.gs.errorToastr(err);
      this.isSpinner = true;
      return {};
    });
  }

  // Using for data GET
  get(api: any, params?: any) {
    if (!params) {
      params = '';
    }
    return new Promise((resolve, reject) => {
      this.http.get(this.serverURL + api + params).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    })
  }

  // Using for data SAVE and GET
  post(api: any, data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.serverURL + api, data).subscribe((res) => {
        resolve(res)
      }, (err) => {
        reject(err)
      })
    })
  }

  // post(api: any, data: any) {
  //   // get-all-category : aSiWRfbznZ5WlO9N2qodO7ERHdw9R1xQAjXI4mAwzTt63tgqZjCpb8MvejlOtBzo
  //   const headers = new HttpHeaders({
  //     'Content-Type':'application/json; charset=utf-8',
  //     'Access-Control-Request-Headers': '*',
  //     'api-key': 'aSiWRfbznZ5WlO9N2qodO7ERHdw9R1xQAjXI4mAwzTt63tgqZjCpb8MvejlOtBzo',
  //     'Accept': 'application/ejson'
  //   });

  //   return new Promise((resolve, reject) => {
  //     this.http.post('https://ap-south-1.aws.data.mongodb-api.com/app/data-ykhua/endpoint/data/v1/action/findOne',{
  //       "collection":"categories",
  //       "database":"test",
  //       "dataSource":"dreamteam11",
  //       "projection": {"_id": 1}
  //   },{ headers: headers }).subscribe((res) => {
  //       resolve(res)
  //     }, (err) => {
  //       reject(err)
  //     })
  //   })
  // }

  // Using for data UPDATE
  put(api: any, data: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.serverURL + api, data).subscribe((res) => {
        resolve(res)
      }, (err) => {
        reject(err)
      })
    })
  }

  // Using for data DELETE
  delete(api: any, params: any) {
    console.log("api>>>>", api);
    return new Promise((resolve, reject) => {
      this.http.delete(this.serverURL + api + '/' + params).subscribe((res) => {
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }
}
