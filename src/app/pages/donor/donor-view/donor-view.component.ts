import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DonorService } from '../../../services/donor.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Donor } from '../../../models/donor.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-donor-view',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './donor-view.component.html',
  styleUrl: './donor-view.component.scss'
})
export class DonorViewComponent implements OnInit{
  
  donorService = inject(DonorService);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);

  formView: FormGroup = new FormGroup({});
  donor: Donor = new Donor();

  ngOnInit(): void {
    this.initFormView();

    this.route.queryParamMap.subscribe(params => {
      const lastname = params.get('lastname');
      const firstname = params.get('firstname');
      const birthdate = params.get('birthdate');

      this.initDonor(lastname!, firstname!, birthdate!);
    });
  }

  initDonor(lastname: string, firstname: string, birthdate: string){
    this.donorService.getByInfo(lastname, firstname, new Date(birthdate))
    .then(donor => {
      this.donor = donor;
      this.loadFormView();
    }).catch(error => console.log(error));
  }

  initFormView(){
    this.formView = this.formBuilder.group({
      id: [0],
      fullname: ["", Validators.required],
      gender: ["", Validators.required],
      birthdate: ["", Validators.required],
      birthplace: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", Validators.required],
      address: ["", Validators.required],
      donorNo: ["", Validators.required],
      bloodGroup: ["", Validators.required]
    });
  }

  loadFormView(){
    const birthdate = new DatePipe('en-US').transform(this.donor.person.birthDate, 'yyyy-MM-dd')!;

    this.formView = this.formBuilder.group({
      id: [this.donor.id],
      fullname: [this.donor.person.fullname],
      gender: [this.donor.person.gender],
      birthdate: [birthdate],
      birthplace: [this.donor.person.birthPlace],
      phone: [this.donor.person.phone],
      email: [this.donor.person.email],
      address: [this.donor.person.address],
      donorNo: [this.donor.donorNo],
      bloodGroup: [this.donor.bloodType]
    });
  }

  info(){
    const lastname = this.route.snapshot.paramMap.get('lastname');
    const firstname = this.route.snapshot.paramMap.get('firstname');
    const birthdate = this.route.snapshot.paramMap.get('birthdate');

    alert(`${lastname} ${firstname} ${birthdate}`);
  }

}
