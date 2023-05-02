import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { GlobalService } from 'src/app/service/global.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {

  isAddForm: boolean = true;
  categoryForm: any = FormGroup;
  routeId: any = '';
  formType: any = '';
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public gs: GlobalService,
  ) {
    this.categoryForm = this.fb.group({
      _id: [''],
      category_name: ['', Validators.required],
      category_logo: [''],
      position: [''],
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
  }

  getCategoryById(catId : any) {
    this.auth.post('categories/get-category-byid', { _id: catId }).then((res: any) => {
      this.categoryForm.patchValue(res.data);
    })
  }

  // Add category
  saveCategory(from:any){
    console.log("from >>>>>", from);
    if(from.valid){
      delete from.value._id;
      this.auth.post('categories/save-category', from.value).then((res:any) => {
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
  updateCategory(from:any, type:any){
    console.log("from >>>>>", from);
    if(from.valid){
      this.auth.post('categories/update-category', from.value).then((res:any) => {
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
    this.router.navigate(['/main-layout/category']);
  }

  imageUpload(event:any){
    let fd = new FormData();
    fd.append("file", event.target.files[0]);
    this.auth.post('upload_files/file-upload', fd).then((res:any) => {
      this.gs.openSnackBar(res.msg);
      if(res.status){
        this.categoryForm.patchValue({
          category_logo : this.gs.imageURL+res.filename
        });
      }
    });
  }
}
