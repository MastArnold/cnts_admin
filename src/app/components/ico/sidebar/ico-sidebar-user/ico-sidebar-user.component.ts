import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ico-sidebar-user',
  imports: [],
  templateUrl: './ico-sidebar-user.component.html',
  styleUrl: './ico-sidebar-user.component.scss'
})
export class IcoSidebarUserComponent {
  @Input() size: string = "w-4";
  @Input() fillColor: string = "fill-gray-800";
}
