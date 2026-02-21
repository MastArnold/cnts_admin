import { Component, inject, OnInit, output, signal } from '@angular/core';
import { DonorService } from '../../../services/donor.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-modal-search-list',
  imports: [NgClass, FormsModule, ReactiveFormsModule],
  templateUrl: './modal-search-list.component.html',
  styleUrl: './modal-search-list.component.scss'
})
export class ModalSearchListComponent implements OnInit{
  
  closeModal = output<void>();

  donorService = inject(DonorService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  loading = signal(false);
  card404 = signal(false);
  form : FormGroup = new FormGroup({});
  currentTab = signal("-translate-x-0");
  
  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.form = this.formBuilder.group({
      lastname: [''],
      firstname: [''],
      birthdate: [''],
      phone: [''],
      donorNo: [''],
      nin: [''],
      drivingLicense: ['']
    });
  }

  search(){
    this.loading.set(true);
    const datePipe = new DatePipe('en-US');

    const formValue = this.form.value;
    const lastname = formValue['lastname'];
    const firstname = formValue['firstname'];
    const birthdate = formValue['birthdate'];
    const donorNo = formValue['donorNo'];

    if(donorNo != ""){
      this.donorService.getByDonorNo(donorNo).then((donor) => {
        const birthDateString = datePipe.transform(donor.person.birthDate, 'yyyy-MM-dd')!;

        this.router.navigate(['donor/view', 1], { queryParams: { lastname: donor.person.lastname, firstname: donor.person.firstname, birthdate: birthDateString } });
      }).catch((error) => {
        if(error.status){
          if(error.status == 404) this.card404.set(true);
        }else{
          console.log(error);
        }
        this.loading.set(false);
      });

      return;
    }

    this.donorService.getByInfo(lastname, firstname, birthdate).then((donor) => {
      const birthDateString = datePipe.transform(birthdate, 'yyyy-MM-dd')!;

      this.router.navigate(['donor/view', 1], { queryParams: { lastname: lastname, firstname: firstname, birthdate: birthDateString } });
    }).catch((error) => {
      if(error.status){
        if(error.status == 404) this.card404.set(true);
      }else{
        console.log(error);
      }
      this.loading.set(false);
    });
  }

  close(){
    this.closeModal.emit();
  }

  toDonorAdd(){
    const formValue = this.form.value;
    const lastname = formValue['lastname'];
    const firstname = formValue['firstname'];
    const birthdate = formValue['birthdate'];

    this.donorService.setFormPreload({
      fullname: lastname + ' ' + firstname,
      birthdate: birthdate
    });
    this.closeModal.emit();
    this.router.navigate(['donor/add']);
  }

  switchTab(tab: number){
    switch(tab){
      case 1:
        this.currentTab.set("-translate-x-0");
        break;
      case 2:
        this.currentTab.set("-translate-x-full");
        break;
      case 3:
        this.currentTab.set("-translate-x-2full");
        break;
      default:
        this.currentTab.set("-translate-x-0");
        break;
    }
  }

}
