import { Component, inject, OnInit, signal } from '@angular/core';
import { DonorService } from '../../../services/donor.service';
import { DatePipe, NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Donor } from '../../../models/donor.model';
import { Person } from '../../../models/person.model';
import { AddressService } from '../../../services/address.service';
import { AddressInterface } from '../../../interfaces/address.interface';

@Component({
  selector: 'app-donor-add',
  imports: [NgClass, ReactiveFormsModule, DatePipe],
  templateUrl: './donor-add.component.html',
  styleUrl: './donor-add.component.scss'
})
export class DonorAddComponent implements OnInit{

  donorService = inject(DonorService);
  formBuilder = inject(FormBuilder);
  addressService = inject(AddressService);

  loading = signal(false);
  resumeWindow = signal(false);
  donor = signal(new Donor());

  form: FormGroup = new FormGroup({});
  formPreview = this.donorService.getFormPreload();
  addresses = signal<AddressInterface[]>([]);
  addressesBP = signal<AddressInterface[]>([]);
  civilQualities = ["mr", "mme", "mlle", "dr", "pr"];

  ngOnInit(): void {
    this.initForm();
    this.donorService.cleanFormPreload();
  }

  initForm(){
    this.form = this.formBuilder.group({
      fullname: [this.formPreview().fullname != "" ? this.formPreview().fullname : "", Validators.required],
      gender: ["", Validators.required],
      birthdate: [this.formPreview().birthdate != "" ? this.formPreview().birthdate : "", Validators.required],
      birthplace: ["", Validators.required],
      civilQuality: ["", Validators.required],
      marital: [""],
      nin: [""],
      license: [""],
      mother: [""],
      father: [""],
      phone: ["", Validators.required],
      email: [""],
      address: ["", Validators.required],
      donorNo: [""],
    });
  }

  addressInput(){
    const term = this.form.value['address'];
    if(term == ""){
      this.addresses.set([]);
      return ;
    }

    this.addresses.set(this.addressService.searchGood(term));
  }

  addressBPInput(){
    const term = this.form.value['birthplace'];
    if(term == ""){
      this.addressesBP.set([]);
      return ;
    }

    this.addressesBP.set(this.addressService.searchGood(term));
  }

  pickAddress(localite: string){
    this.addresses.set([]);
    this.form.patchValue({address: `${localite}, BF`});
  }

  pickAddressBP(localite: string){
    this.addressesBP.set([]);
    this.form.patchValue({birthplace: `${localite}, BF`});
  }

  openResumeWindow(){
    this.resumeWindow.set(true);
  }

  closeResumeWindow(){
    this.resumeWindow.set(false);
    this.loading.set(false);
    this.donor.set(new Donor());
  }

  resume(){
    this.loading.set(true);

    const formValue = this.form.value;
    const fullname = formValue['fullname'];
    const lastname = fullname.split(" ")[0];
    const firstname = fullname.split(" ").slice(1).join(" ");
    const gender = formValue['gender'];
    const birthdate = new Date(formValue['birthdate']);
    const birthplace = formValue['birthplace'];
    const civilQuality = formValue['civilQuality'];
    const marital = formValue['marital'];
    const nin = formValue['nin'];
    const license = formValue['license'];
    const mother = formValue['mother'];
    const father = formValue['father'];
    const phone = formValue['phone'];
    const email = formValue['email'];
    const address = formValue['address'];
    //const donorNo = formValue['donorNo'];

    const addingPerson = new Person(
      0,
      lastname,
      firstname,
      gender,
      birthdate,
      birthplace,
      phone,
      email,
      address,
      nin,
      license
    );
    const addingDonor = new Donor();
    addingDonor.person = addingPerson;
    addingDonor.civilQuality = civilQuality;
    addingDonor.marital = marital;
    addingDonor.mother = mother;
    addingDonor.father = father;

    this.donor.set(addingDonor);
    this.openResumeWindow();
  }

  save(){
    this.donorService.storeLegacy(this.donor()).then(donor => {
      alert("Donneur enregistré !");
      console.log(donor);
      this.initForm();
      this.closeResumeWindow();
    }).catch(error => {
      alert("Une erreur est survenue lors de l'enregistrement du donneur ! Veuillez recommencer.");
      console.log(error);
    });
    
  }
  
}
