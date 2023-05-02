import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { GlobalService } from 'src/app/service/global.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-tournament',
  templateUrl: './add-edit-tournament.component.html',
  styleUrls: ['./add-edit-tournament.component.scss']
})
export class AddEditTournamentComponent implements OnInit {

  isAddForm: boolean = true;
  tournamentForm: any = FormGroup;
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
    this.tournamentForm = this.fb.group({
      _id: [''],
      tournament_name: ['', Validators.required],
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
      this.tournamentForm.patchValue({
        category_id : this.catlist[0]._id
      });
    })
  }

  getCategoryById(catId : any) {
    this.auth.post('tournaments/get-tournament-byid', { _id: catId }).then((res: any) => {
      this.tournamentForm.patchValue(res.data);
    })
  }

  // Add category
  saveTournament(from:any){
    console.log("from >>>>>", from);
    if(from.valid){
      delete from.value._id;
      this.auth.post('tournaments/save-tournament', from.value).then((res:any) => {
        if(this.formType == 'add'){
          this.gs.openSnackBar(res.msg);
        }else{
          // clone
          this.gs.openSnackBar('Category clone successfully');
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
      this.auth.post('tournaments/update-tournament', from.value).then((res:any) => {
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
    this.router.navigate(['/main-layout/tournament']);
  }
}
