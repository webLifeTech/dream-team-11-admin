import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.scss']
})
export class AirlinesComponent implements OnInit {

  allAirlinesList: any = [];
  isSpinner: boolean = false;

  constructor(
    private router: Router,
    private api: AuthService,
    private gs: GlobalService,
  ) { }

  ngOnInit(): void {
    this.getAllAirlines();
  }

  // Get All Airline
  getAllAirlines() {
    this.isSpinner = true;
    this.api.get('airlines/get-all').then((res: any) => {
      if (res.status) {
        this.allAirlinesList = res.data;
      } else {
        this.gs.errorToastr(res.msg);
      }
      this.isSpinner = false;
    })
  }

  // Add new airline
  addNewAirline() {
    this.router.navigate(['airlines', 'add', 'new'])
  }

  // Edit airline
  editData(airlineId: any) {
    this.router.navigate(['airlines', 'edit', airlineId])
  }

  // Delete airline
  deleteAirlineById(airlineId: any, index: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isSpinner = true;
        this.api.delete('airlines/delete', airlineId).then((res: any) => {
          if (res.status) {
            this.gs.successToastr(res.msg);
            this.allAirlinesList.splice(index, 1);
          } else {
            this.gs.errorToastr(res.msg);
          }
          this.isSpinner = false;
        })
      }
    })
  }

}
