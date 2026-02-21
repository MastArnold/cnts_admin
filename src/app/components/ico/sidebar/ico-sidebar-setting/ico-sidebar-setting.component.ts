import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ico-sidebar-setting',
  imports: [],
  templateUrl: './ico-sidebar-setting.component.html',
  styleUrl: './ico-sidebar-setting.component.scss'
})
export class IcoSidebarSettingComponent {
  @Input() size: string = "w-6";
  @Input() fillColor: string = "fill-gray-800";
}
