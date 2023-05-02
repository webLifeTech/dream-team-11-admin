import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from 'src/app/service/global.service';
import { AuthService } from 'src/app/service/auth.service';

export interface PeriodicElement {
  tournament_name: string;
  category_name: string;
  action: any;
}

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  displayedColumns: string[] = ['tournament_name','category_name', 'action'];
  dataSource: MatTableDataSource<PeriodicElement> | any;
  constructor(
    private auth: AuthService,
    public gs: GlobalService,
  ) { }

  ngOnInit(): void {
    this.getAllTournament();
  }

  getAllTournament(){
    this.auth.post('tournaments/get-all-tournament', '').then((res: any) => {
      console.log("Res >>>>", res);
      this.dataSource = new MatTableDataSource(res.data);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 200);
    })
  }

  // Update category
  deleteTournament(catId: any){
    this.auth.post('tournaments/delete-tournament', { _id: catId }).then((res:any) => {
      console.log("Res >>>>", res);
      this.gs.openSnackBar(res.msg);
      if(res.status){
        this.getAllTournament();
      }
    })
  }

}
