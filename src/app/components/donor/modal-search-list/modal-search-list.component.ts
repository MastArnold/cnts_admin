import { Component, inject, OnInit, output } from '@angular/core';
import { DonorService } from '../../../services/donor.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-search-list',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './modal-search-list.component.html',
  styleUrl: './modal-search-list.component.scss'
})
export class ModalSearchListComponent implements OnInit{
  
  closeModal = output<void>();

  donorService = inject(DonorService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  form : FormGroup = new FormGroup({});
  
  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.form = this.formBuilder.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      birthdate: ['', Validators.required],
      phone: [''],
      donorNo: [''],
      nin: [''],
      drivingLicense: ['']
    });
  }

  search(){
    const formValue = this.form.value;
    const lastname = formValue['lastname'];
    const firstname = formValue['firstname'];
    const birthdate = formValue['birthdate'];

    this.donorService.getByInfo(lastname, firstname, birthdate).then((donor) => {
      const datePipe = new DatePipe('en-US');
      const birthDateString = datePipe.transform(birthdate, 'yyyy-MM-dd')!;

      this.router.navigate(['donor/view', 1], { queryParams: { lastname: lastname, firstname: firstname, birthdate: birthDateString } });
    }).catch((error) => {
      alert("Donneur Introuvable !")
      console.log(error);
    });
  }

  close(){
    this.closeModal.emit();
  }

}
