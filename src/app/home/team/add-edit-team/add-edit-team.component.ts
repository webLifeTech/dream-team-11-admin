import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { GlobalService } from 'src/app/service/global.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-team',
  templateUrl: './add-edit-team.component.html',
  styleUrls: ['./add-edit-team.component.scss']
})
export class AddEditTeamComponent implements OnInit {

  isAddForm: boolean = true;
  teamForm: any = FormGroup;
  routeId: any = '';
  formType: any = '';
  catlist: any = [];
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public gs: GlobalService,
  ) {
    this.teamForm = this.fb.group({
      _id: [''],
      team_name: ['', Validators.required],
      team_short_name: ['', Validators.required],
      team_logo: [''],
      category_id: [''],
      status: [true],
    });

    this.routeId = this.route.snapshot.paramMap.get('id');
    this.formType = this.route.snapshot.paramMap.get('type');
    if(this.routeId != 'new'){
      this.getCategoryById(this.routeId);
      this.isAddForm = false;
    }
    if(this.formType == 'clone'){
      this.isAddForm = true;
    }
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  // for category dropdwon
  getAllCategory(){
    this.auth.post('categories/get-all-category', '').then((res: any) => {
      console.log("Res11 >>>>", res);
      this.catlist = res.data;
      this.teamForm.patchValue({
        category_id : this.catlist[0]._id
      });
    })
  }

  getCategoryById(catId : any) {
    this.auth.post('teams/get-team-byid', { _id: catId }).then((res: any) => {
      this.teamForm.patchValue(res.data);
    })
  }

  // Add category
  saveTournament(from:any){
    console.log("from >>>>>", from);
    if(from.valid){
      delete from.value._id;
      this.auth.post('teams/save-team', from.value).then((res:any) => {
        if(this.formType == 'add'){
          this.gs.openSnackBar(res.msg);
        }else{
          // clone
          this.gs.openSnackBar('Team clone successfully');
        }
        if(res.status){
          this.back();
        }
      })
    }else{
      this.gs.openSnackBar("Please fill the all required fields!");
    }
  }

  // Update category
  updateTournament(from:any, type:any){
    console.log("from >>>>>", from);
    if(from.valid){
      this.auth.post('teams/update-team', from.value).then((res:any) => {
        this.gs.openSnackBar(res.msg);
        if(res.status){
          if(type == 'exit'){
            this.back();
          }
        }
      });
    }else{
      this.gs.openSnackBar("Please fill the all required fields!");
    }
  }

  back() {
    this.router.navigate(['/main-layout/team']);
  }

  imageUpload(event:any){
    let fd = new FormData();
    fd.append("file", event.target.files[0]);
    this.auth.post('upload_files/file-upload', fd).then((res:any) => {
      this.gs.openSnackBar(res.msg);
      if(res.status){
        this.teamForm.patchValue({
          team_logo : this.gs.imageURL+'image/'+res.filename
        });
      }
    });
  }
}
