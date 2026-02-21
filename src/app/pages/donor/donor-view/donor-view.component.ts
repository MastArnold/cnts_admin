import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DonorService } from '../../../services/donor.service';
import { ActivatedRoute } from '@angular/router';
import { Donor } from '../../../models/donor.model';
import { DatePipe, NgClass } from '@angular/common';
import { CanComponentDeactivate } from '../../../interfaces/deactivate-component.interface';
import { Observable } from 'rxjs';
import { ConfirmDialogService } from '../../../services/confirm-dialog.service';
import { Person } from '../../../models/person.model';

@Component({
  selector: 'app-donor-view',
  imports: [NgClass, ReactiveFormsModule, DatePipe],
  templateUrl: './donor-view.component.html',
  styleUrl: './donor-view.component.scss'
})
export class DonorViewComponent implements OnInit, CanComponentDeactivate{
  
  donorService = inject(DonorService);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  dialog = inject(ConfirmDialogService);

  loading = signal(true);
  formMode: string = 'view';
  formView: FormGroup = new FormGroup({});
  donor = signal(new Donor());
  civilQualities = ["mr", "mme", "mlle", "dr", "pr"];

  hasUnsavedChanges = signal(false);
  unsavedChangesCount = signal(0);

  ngOnInit(): void {
    this.initFormView();

    this.route.queryParamMap.subscribe(params => {
      const lastname = params.get('lastname');
      const firstname = params.get('firstname');
      const birthdate = params.get('birthdate');

      this.initDonor(lastname!, firstname!, birthdate!);
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.checkUpdates();

    if (!this.hasUnsavedChanges()) {
      return true;
    }
    
    return this.dialog.open(
      'Attention',
      'Vous quittez le formulaire de vue donneur',
      `Vous avez encore ${this.unsavedChangesCount()} champs  à confirmer !`,
      { ok: true }
    );

    /*return this.dialog.open(
      'Attention',
      'Vous quittez le formulaire de vue donneur',
      `Vous avez encore ${this.unsavedChangesCount()} champs  à confirmer. Êtes-vous sûr de vouloir quitter ?`
    );*/
  }

  initDonor(lastname: string, firstname: string, birthdate: string){
    this.donorService.getByInfo(lastname, firstname, new Date(birthdate))
    .then(donor => {
      this.donor.set(donor);
      this.loadFormView();
      this.checkUpdates();
      setTimeout(() => { this.loading.set(false); }, 500); 
    }).catch((error) => {
      console.log(error);
    });
  }

  initFormView(){
    this.formView = this.formBuilder.group({
      id: [0],
      fullname: ["", Validators.required],
      gender: ["", Validators.required],
      birthdate: ["", Validators.required],
      birthplace: ["", Validators.required],
      civilQuality: ["", Validators.required],
      marital: [""],
      nin: [""],
      license: [""],
      phone: ["", Validators.required],
      email: [""],
      address: ["", Validators.required],
      donorNo: [""],
      bloodGroup: [""],
      rhesus: [""],
      isValid: [false]
    });
  }

  loadFormView(){
    const birthdate = new DatePipe('en-US').transform(this.donor().person.birthDate, 'yyyy-MM-dd')!;
    const group = this.donor().bloodType != "" ? `${this.donor().bloodType[0]} ${this.donor().bloodType[1]}` : "";
    const rhesus = this.donor().bloodType != "" ? this.donor().bloodType[1] : "";

    this.formView = this.formBuilder.group({
      id: [this.donor().id],
      fullname: [this.donor().person.fullname, Validators.required],
      gender: [this.donor().person.gender, Validators.required],
      birthdate: [birthdate, Validators.required],
      birthplace: [this.donor().person.birthPlace, Validators.required],
      civilQuality: [this.donor().civilQuality?.toLowerCase(), Validators.required],
      marital: [this.donor().marital],
      nin: [this.donor().person.nin],
      license: [this.donor().person.drivingLicenceNo],
      phone: [this.donor().person.phone, Validators.required],
      email: [this.donor().person.email],
      address: [this.donor().person.address, Validators.required],
      donorNo: [this.donor().donorNo],
      bloodGroup: [group],
      rhesus: [rhesus],
      isValid: [this.donor().eligible]
    });
  }

  isView() { return this.formMode === 'view'; }

  isEdit() { return this.formMode === 'edit'; }

  toggleFormMode(){
    this.formMode = this.isView() ? 'edit' : 'view';
  }

  update(){
    this.loading.set(true);
    
    const formValue = this.formView.value;
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
    const donorNo = formValue['donorNo'];

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
    addingDonor.donorNo = donorNo;
    addingDonor.person = addingPerson;
    addingDonor.civilQuality = civilQuality;
    addingDonor.marital = marital;
    addingDonor.mother = mother;
    addingDonor.father = father;

    this.donorService.updateLegacy(addingDonor).then((donor) => {
      this.donor.set(donor);
      this.checkUpdates();
      alert("Mise à jour effectuée !");
      this.loading.set(false);
    }).catch((error) => {
      alert("Mise à jour échouée !");
      console.log(error);
      this.loading.set(false);
    })
  }

  checkUpdates(){
    this.unsavedChangesCount.set(0);

    if(this.hasNoPhone()) this.unsavedChangesCount.update(value => ++value);

    if(this.hasNoIdentityNumber()) this.unsavedChangesCount.update(value => ++value);

    if(this.unsavedChangesCount() > 0) this.hasUnsavedChanges.set(true);

    return ;
  }

  hasNoIdentityNumber(){
    return (this.donor().person.nin == null || this.donor().person.nin == "") 
            && 
            (this.donor().person.drivingLicenceNo == null || this.donor().person.drivingLicenceNo == "");
  }

  hasNoPhone(){
    return this.donor().person.phone == null || this.donor().person.phone == "";
  }

}
