import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = true;
  showSubSubMenu: boolean = false;
  appInfoForm: any = FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public gs: GlobalService,
  ) {
    this.appInfoForm = this.fb.group({
      app_id: ['', Validators.required],
      app_version: ['', Validators.required],
      random_ads: ['', Validators.required],
      app_update: [true, Validators.required],
      is_adsshow: [true, Validators.required]
    })
  }

  ngOnInit(): void {
    this.auth.get('get_app_info').then((res:any) => {
      console.log("get_app_info Res >>>>", res);
      this.appInfoForm.patchValue(res.ResultData);
    })
  }

  saveData(appInfoForm:any){
    this.auth.post('appdetails/update-app-info', appInfoForm.value).then((res:any) => {
        console.log("update-app-info Res >>>>", res);
        this.gs.openSnackBar(res.ResponseMsg);
    })
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}
