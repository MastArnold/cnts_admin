import { Component, Input } from '@angular/core';
import { IcoSvgI } from '../ico-sidebar.interface';

@Component({
  selector: 'app-ico-sidebar-donor',
  imports: [],
  templateUrl: './ico-sidebar-donor.component.html',
  styleUrl: './ico-sidebar-donor.component.scss'
})
export class IcoSidebarDonorComponent implements IcoSvgI{
  @Input() size: string = "w-6";
  @Input() fillColor: string = "fill-gray-800";
}
