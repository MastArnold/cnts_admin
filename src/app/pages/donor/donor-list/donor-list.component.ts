import { Component, inject, OnInit, signal } from '@angular/core';
import { ModalSearchListComponent } from "../../../components/donor/modal-search-list/modal-search-list.component";
import { DonorService } from '../../../services/donor.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { IcoFilterComponent } from "../../../components/ico/ico-filter/ico-filter.component";
import { IcoLoupeComponent } from "../../../components/ico/ico-loupe/ico-loupe.component";
import { NotFoundComponent } from "../../../components/storyset/not-found/not-found.component";
//import { v4 as uuidv4 } from 'UUID';

@Component({
  selector: 'app-donor-list',
  imports: [ModalSearchListComponent, DatePipe, RouterLink, IcoFilterComponent, IcoLoupeComponent, NotFoundComponent],
  templateUrl: './donor-list.component.html',
  styleUrl: './donor-list.component.scss'
})
export class DonorListComponent implements OnInit{

  route = inject(ActivatedRoute);
  router = inject(Router);

  donorService = inject(DonorService);
  readonly donors = this.donorService.$donors;

  page: number = 1;
  modalSearch = signal(false);
  //const id = uuidv4();

  ngOnInit(): void {
    this.initPagination();
    this.initDonors();
  }

  initPagination(){
    this.route.queryParamMap.subscribe(params => {
      const page_ = params.get('page');
      if(page_ != null){
        this.page = parseInt(page_);
      }      
    });
  }

  nextPage(){
    this.page = this.page + 1;
    this.donorService.loadDonors(this.page);
  }

  previousPage(){
    this.page = this.page - 1;
    this.donorService.loadDonors(this.page);
  }

  initDonors(){
    this.donorService.loadDonors();
  }

  openModalSearch(){
    this.modalSearch.set(true);
  }

  closeModalSearch(){
    this.modalSearch.set(false);
  }

  oraDetail(lastname: string, firstname: string, birthdate: Date){
    //convertir la date de naissance au format YYYY-MM-DD
    const datePipe = new DatePipe('en-US');
    const birthDateString = datePipe.transform(birthdate, 'yyyy-MM-dd')!;

    this.router.navigate(['donor/view', 1], { queryParams: { lastname: lastname, firstname: firstname, birthdate: birthDateString } });
  }

}
