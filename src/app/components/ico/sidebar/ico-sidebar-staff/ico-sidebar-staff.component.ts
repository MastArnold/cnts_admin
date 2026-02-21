import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ico-sidebar-staff',
  imports: [],
  templateUrl: './ico-sidebar-staff.component.html',
  styleUrl: './ico-sidebar-staff.component.scss'
})
export class IcoSidebarStaffComponent {
  @Input() size: string = "w-4";
  @Input() fillColor: string = "fill-gray-800";
}
