import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from 'src/app/service/global.service';
import { AuthService } from 'src/app/service/auth.service';

export interface PeriodicElement {
  team_name: string;
  category_name: string;
  team_short_name: string;
  action: any;
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  displayedColumns: string[] = ['team_name','team_short_name','category_name', 'action'];
  dataSource: MatTableDataSource<PeriodicElement> | any;
  constructor(
    private auth: AuthService,
    public gs: GlobalService,
  ) { }

  ngOnInit(): void {
    this.getAllTeam();
  }

  getAllTeam(){
    this.auth.post('teams/get-all-team', '').then((res: any) => {
      console.log("Res >>>>", res);
      this.dataSource = new MatTableDataSource(res.data);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 200);
    })
  }

  // Update Team
  deleteTeam(catId: any){
    this.auth.post('teams/delete-team', { _id: catId }).then((res:any) => {
      console.log("Res >>>>", res);
      this.gs.openSnackBar(res.msg);
      if(res.status){
        this.getAllTeam();
      }
    })
  }

}
