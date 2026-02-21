import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ico-sidebar-center',
  imports: [],
  templateUrl: './ico-sidebar-center.component.html',
  styleUrl: './ico-sidebar-center.component.scss'
})
export class IcoSidebarCenterComponent {
  @Input() size: string = "w-4";
  @Input() fillColor: string = "fill-gray-800";
}
