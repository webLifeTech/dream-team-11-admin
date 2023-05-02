import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { GlobalService } from 'src/app/service/global.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-match',
  templateUrl: './add-edit-match.component.html',
  styleUrls: ['./add-edit-match.component.scss']
})
export class AddEditMatchComponent implements OnInit {

  isAddForm: boolean = true;
  matchForm: any = FormGroup;
  routeId: any = '';
  formType: any = '';
  categoryList: any = [];
  tournamentList: any = [];
  teamList: any = [];
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public gs: GlobalService,
  ) {
    this.matchForm = this.fb.group({
      _id: [''],
      match_category: [''],
      match_tournament: [''],
      tournament_name: [''],
      category_name: [''],
      match_preview: [''],
      prediction_img:  this.fb.array([]),
      dream_team_img: [''],
      match_date: [''],
      match_end_time: [''],
      team1data: [''],
      team2data: [''],
      status: [true],
    });

    console.log("matchForm.prediction_img >>>", this.matchForm.get('prediction_img').controls);

    this.routeId = this.route.snapshot.paramMap.get('id');
    this.formType = this.route.snapshot.paramMap.get('type');
    if(this.routeId != 'new'){
      this.getMatchById(this.routeId);
      this.isAddForm = false;
    }
    if(this.formType == 'clone'){
      this.isAddForm = true;
    }
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllTournament();
    this.getAllTeam();
  }

  createEmailControl(): FormGroup {
    return this.fb.group({
      prediction_img: ['', [Validators.required]]
    });
  }

  // for category dropdwon
  getAllCategory(){
    this.auth.post('categories/get-all-category', '').then((res: any) => {
      this.categoryList = res.data;
      this.matchForm.patchValue({
        match_category : this.categoryList[0]._id
      });
    })
  }
  // for tournament dropdwon
  getAllTournament(){
    this.auth.post('tournaments/get-all-tournament', '').then((res: any) => {
      this.tournamentList = res.data;
      this.matchForm.patchValue({
        match_tournament : this.tournamentList[0]._id
      });
    })
  }
  // for team dropdwon
  getAllTeam(){
    this.auth.post('teams/get-all-team', '').then((res: any) => {
      this.teamList = res.data;
      console.log("teamList >>>",this.teamList);

      this.matchForm.patchValue({
        team_id : this.teamList[0]._id
      });
    })
  }

  getMatchById(catId : any) {
    this.auth.post('matchs/get-match-byid', { _id: catId }).then((res: any) => {
      this.matchForm.patchValue(res.data);
    })
  }

  // Add category
  saveMatch(from:any){
    console.log("from >>>>>", from);
    if(from.valid){
      delete from.value._id;
      this.auth.post('matchs/save-match', from.value).then((res:any) => {
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
  updateMatch(from:any, type:any){
    console.log("from >>>>>", from);
    if(from.valid){
      this.auth.post('matchs/update-match', from.value).then((res:any) => {
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
    this.router.navigate(['/main-layout/match']);
  }

  imageUpload(event:any){
    let fd = new FormData();
    fd.append("file", event.target.files[0]);
    this.auth.post('upload_files/file-upload', fd).then((res:any) => {
      this.gs.openSnackBar(res.msg);
      if(res.status){

          const emails = this.matchForm.get('prediction_img') as FormArray;
          emails.push(this.fb.control(this.gs.imageURL+"image/"+res.filename));
        // this.matchForm.patchValue({
        //   team_logo : this.gs.imageURL+res.filename
        // });
        console.log("prediction_img >>>", this.matchForm.get('prediction_img').controls);
      }
    });
  }


  imageRemove(index: any) {
    console.log("index>>", index);
    this.matchForm.prediction_img.splice(index, 1)
  }
}
