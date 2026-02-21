import { Component, Input } from '@angular/core';
import { IcoSvgI } from '../ico-sidebar.interface';

@Component({
  selector: 'app-ico-sidebar-dashboard',
  imports: [],
  templateUrl: './ico-sidebar-dashboard.component.html',
  styleUrl: './ico-sidebar-dashboard.component.scss'
})
export class IcoSidebarDashboardComponent implements IcoSvgI{
  @Input() size: string = "w-4";
  @Input() fillColor: string = "fill-gray-800";
}
