import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ico-sidebar-donation',
  imports: [],
  templateUrl: './ico-sidebar-donation.component.html',
  styleUrl: './ico-sidebar-donation.component.scss'
})
export class IcoSidebarDonationComponent {
  @Input() size: string = "w-6";
  @Input() fillColor: string = "fill-gray-800";
}
