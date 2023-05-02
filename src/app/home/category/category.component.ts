import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/service/global.service';
import { AuthService } from 'src/app/service/auth.service';

export interface PeriodicElement {
  category_name: string;
  action: any;
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


  categoryList: PeriodicElement[] = [];
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public gs: GlobalService,
  ) {}

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory(){
    this.auth.post('categories/get-all-category', '').then((res: any) => {
      console.log("Res >>>>", res);
      this.dataSource = new MatTableDataSource(res.data);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 200);
    })
  }

  // Update category
  deleteCategory(catId: any){
    this.auth.post('categories/delete-category', { _id: catId }).then((res:any) => {
      console.log("Res >>>>", res);
      this.gs.openSnackBar(res.msg);
      if(res.status){
        this.getAllCategory();
      }
    })
  }
}
