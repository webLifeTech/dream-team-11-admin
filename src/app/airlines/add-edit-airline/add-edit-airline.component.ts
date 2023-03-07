import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { GlobalService } from 'src/app/service/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-airline',
  templateUrl: './add-edit-airline.component.html',
  styleUrls: ['./add-edit-airline.component.scss']
})
export class AddEditAirlineComponent implements OnInit {

  airlineForm: FormGroup;
  isEdit: boolean = false;
  submitted: boolean = false;
  isSpinner: boolean = false;

  constructor(
    private router: Router,
    private acRoute: ActivatedRoute,
    private fb: FormBuilder,
    private api: AuthService,
    public gs: GlobalService,
  ) {
    this.airlineForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      country: ['', Validators.required],
      slogan: ['', Validators.required],
      head_quaters: ['', Validators.required],
      website: ['', Validators.required],
      established: ['', Validators.required],
      // editedby: [''],
    })
  }

  ngOnInit(): void {
    this.acRoute.params.subscribe((params: any) => {
      if (params.slug == 'new') {
        this.isEdit = false;
      } else {
        this.getAirlineById(params.slug)
        this.isEdit = true;
      }
    })
  }

  get registerFormControl() {
    return this.airlineForm.controls;
  }

  // Get Airline by Id
  getAirlineById(airlineId: any) {
    this.isSpinner = true;
    this.api.get('airlines/get-byid/', airlineId).then((res: any) => {
      if (res.status) {
        this.airlineForm.patchValue(res.data)
      } else {
        this.gs.errorToastr(res.msg);
      }
      this.isSpinner = false;
    })
  }

  // Save Airline
  submitAirlineForm(airlineForm: any, type: any) {
    this.submitted = true;
    if (airlineForm.valid) {
      delete this.airlineForm.value._id;
      this.isSpinner = true;
      this.api.post('airlines/save', this.airlineForm.value).then((res: any) => {
        if (res.status) {
          this.gs.successToastr(res.msg);
          this.airlineForm.markAsPristine();
          if (type == 'noexit') {
            this.airlineForm.reset();
          }
          if (type == 'exit') {
            this.router.navigate(['/airlines']);
          }
        } else {
          this.gs.errorToastr(res.msg);
        }
        this.isSpinner = false;
      })
    } else {
      this.gs.errorToastr('Please fill the all required fields');
    }
  }

  // Update Airline
  updateAirlineForm(airlineForm: any, type: any) {
    this.submitted = true;
    if (airlineForm.valid) {
      this.isSpinner = true;
      this.api.put('airlines/update', this.airlineForm.value).then((res: any) => {
        if (res.status) {
          this.gs.successToastr(res.msg);
          this.airlineForm.markAsPristine();
          if (type == 'exit') {
            this.router.navigate(['/airlines']);
          }
        } else {
          this.gs.errorToastr(res.msg);
        }
        this.isSpinner = false;
      })
    }
  }

  // Back button
  goBack(airlineForm: any) {
    if (airlineForm.dirty) {
      // If any change in form by user
      let text = '';
      if (!this.isEdit) {
        text = "If you click Yes, your filled data won’t be saved. Are you sure want to back ?"
      } else {
        text = "If you click Yes, your changed data won’t be saved. Are you sure want to back ?"
      }
      Swal.fire({
        title: 'Are you sure?',
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/airlines']);
        }
      })
    } else {
      this.router.navigate(['/airlines']);
    }
  }

}
