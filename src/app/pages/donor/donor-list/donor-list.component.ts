import { Component } from '@angular/core';
import { ModalSearchListComponent } from "../../../components/donor/modal-search-list/modal-search-list.component";

@Component({
  selector: 'app-donor-list',
  imports: [ModalSearchListComponent],
  templateUrl: './donor-list.component.html',
  styleUrl: './donor-list.component.scss'
})
export class DonorListComponent {

}
