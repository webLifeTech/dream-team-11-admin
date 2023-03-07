import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/service/global.service';
import { AuthService } from 'src/app/service/auth.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  displayedColumns: string[] = ['category_name', 'action'];
  dataSource: MatTableDataSource<PeriodicElement> | any;

  isExpanded = true;
  isAction: boolean = false;
  isAddForm: boolean = true;
  categoryForm: any = FormGroup;
  categoryList: PeriodicElement[] = [];
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public gs: GlobalService,
  ) {
    this.categoryForm = this.fb.group({
      category_name: ['', Validators.required],
      category_logo: [''],
    })
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  getAllCategory(){
    this.auth.post('get_category_list', '').then((res: any) => {
      console.log("Res >>>>", res);
      this.dataSource = new MatTableDataSource(res.ResultData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 500);
      // this.appInfoForm.patchValue(res.ResultData);
    })
  }

  addCategory() {
    this.isAction = true;
    this.isAddForm = true;
  }

  categorySubmit(from:any){
    console.log("from >>>>>", from);
    if(from.valid){
      this.auth.post('categories/save-category', from.value).then((res:any) => {
        console.log("Res >>>>", res);
        this.gs.openSnackBar(res.ResponseMsg);
        if(res.status){
          // this.isAction = false;
        }
    })
    }else{
      this.gs.openSnackBar("Please fill the all required fields!");
    }
  }

  back() {
    this.isAction = false;
  }
}
